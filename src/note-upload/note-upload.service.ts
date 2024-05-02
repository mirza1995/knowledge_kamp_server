import { noteUploadsTable } from '@/db/noteUpload';
import { NoteUploadDTO } from '@/dto/noteUploads/note-upload-dto';
import { DB, DbType } from '@/global/providers/db.provider';
import { UploadsService } from '@/uploads/uploads.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { createWorker, Scheduler, createScheduler } from 'tesseract.js';

@Injectable()
export class NoteUploadService {
  private static languages = 'bos+eng';
  constructor(
    @Inject(DB) private readonly db: DbType,
    private readonly uploadsService: UploadsService,
  ) {}

  async createNotesUpload(userId: string, urls: string[], uploadId: string) {
    const scheduler = await this.getScheduler(urls.length);
    const conversionsPromises = urls.map((url) =>
      scheduler.addJob('recognize', url),
    );
    const results = await Promise.all(conversionsPromises);

    const texts = results.map((result) => result.data.text);

    this.createNoteUploads(texts, uploadId, userId);

    await scheduler.terminate();
  }

  async getUploadedNotes(uploadId: string, userId: string) {
    const uploadedNotes = await this.db
      .select()
      .from(noteUploadsTable)
      .where(
        and(
          eq(noteUploadsTable.uploadId, uploadId),
          eq(noteUploadsTable.userId, userId),
        ),
      );

    return uploadedNotes.map((uploadedNote) =>
      NoteUploadDTO.toDTO(uploadedNote),
    );
  }

  private async createNoteUploads(
    texts: string[],
    uploadId: string,
    userId: string,
  ) {
    await this.db
      .insert(noteUploadsTable)
      .values(texts.map((text) => ({ text, uploadId, userId })));

    this.uploadsService.updateUpload(uploadId, 'COMPLETED');
  }

  private async getScheduler(workersCount: number) {
    const scheduler = createScheduler();
    const workerPromises: Promise<void>[] = [];
    for (let i = 0; i < workersCount; i++) {
      const generateWorkerPromise = this.generateWorker(scheduler);
      workerPromises.push(generateWorkerPromise);
    }

    await Promise.all(workerPromises);

    return scheduler;
  }

  private async generateWorker(scheduler: Scheduler) {
    const worker = await createWorker(NoteUploadService.languages);
    scheduler.addWorker(worker);
  }
}
