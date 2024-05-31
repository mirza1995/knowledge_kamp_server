import { noteUploadsTable } from '@/db/noteUpload';
import { NoteUploadDTO } from '@/dto/noteUploads/note-upload-dto';
import { SaveNoteUploadsToNotebookDTO } from '@/dto/noteUploads/save-note-uploads-to-notebook-dto';
import { UpdateNoteUploadDTO } from '@/dto/noteUploads/update-note-upload-dto';
import { DB, DbType } from '@/global/providers/db.provider';
import { UploadsService } from '@/uploads/uploads.service';
import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, inArray } from 'drizzle-orm';
import { createWorker, Scheduler, createScheduler } from 'tesseract.js';
import { NotesService } from '@/notes/notes.service';
import { CombineNoteUploadsDTO } from '@/dto/noteUploads/combine-note-uploads-dto';

@Injectable()
export class NoteUploadService {
  private static languages = 'bos+eng';
  constructor(
    @Inject(DB) private readonly db: DbType,
    private readonly uploadsService: UploadsService,
    private readonly notesService: NotesService,
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
      )
      .orderBy(desc(noteUploadsTable.dateCreated));

    return uploadedNotes.map((uploadedNote) =>
      NoteUploadDTO.toDTO(uploadedNote),
    );
  }

  async updateNoteUpload(
    noteUploadId: string,
    userId: string,
    updateNoteUploadDto: UpdateNoteUploadDTO,
  ) {
    const updatedNoteUpload = await this.db
      .update(noteUploadsTable)
      .set(updateNoteUploadDto)
      .where(
        and(
          eq(noteUploadsTable.id, noteUploadId),
          eq(noteUploadsTable.userId, userId),
        ),
      )
      .returning();

    return updatedNoteUpload[0];
  }

  async saveNoteUploadsToNotebook(
    userId: string,
    saveNoteUploadsToNotebookDto: SaveNoteUploadsToNotebookDTO,
  ) {
    const newNotes = await this.notesService.createNotes(
      saveNoteUploadsToNotebookDto.noteUploads.map((noteUpload) => ({
        content: noteUpload.text,
      })),
      saveNoteUploadsToNotebookDto.notebookId,
      userId,
    );

    await this.deleteNoteUploads(
      saveNoteUploadsToNotebookDto.noteUploads.map(
        (noteUpload) => noteUpload.id,
      ),
      userId,
    );

    return newNotes;
  }

  async combineNoteUploads(
    uploadId: string,
    userId: string,
    combineNoteUploadsDto: CombineNoteUploadsDTO,
  ) {
    return this.db.transaction(async () => {
      const newNoteUpload = await this.createNoteUpload(
        combineNoteUploadsDto.text,
        uploadId,
        userId,
      );

      await this.deleteNoteUploads(combineNoteUploadsDto.noteUploadIds, userId);

      return newNoteUpload[0];
    });
  }

  async deleteNoteUploads(noteUploadIds: string[], userId: string) {
    const deletedNoteUpload = await this.db
      .delete(noteUploadsTable)
      .where(
        and(
          inArray(noteUploadsTable.id, noteUploadIds),
          eq(noteUploadsTable.userId, userId),
        ),
      )
      .returning();

    return !!deletedNoteUpload;
  }

  async createNoteUpload(text: string, uploadId: string, userId: string) {
    return await this.db
      .insert(noteUploadsTable)
      .values({ text, uploadId, userId })
      .returning();
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
    await worker.setParameters({
      tessedit_char_whitelist:
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzćčžšđ/' '",
    });
    scheduler.addWorker(worker);
  }
}
