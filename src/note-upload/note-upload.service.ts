import { noteUploadsTable } from '@/db/noteUpload';
import { DB, DbType } from '@/global/providers/db.provider';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { createWorker, Scheduler, createScheduler } from 'tesseract.js';

@Injectable()
export class NoteUploadService {
  private static languages = 'bos+eng';
  constructor(@Inject(DB) private readonly db: DbType) {}

  private readonly logger = new Logger(NoteUploadService.name);

  async createNotesUpload(urls: string[]) {
    const scheduler = await this.getScheduler(urls.length);
    const conversionsPromises = urls.map((url) =>
      scheduler.addJob('recognize', url),
    );
    const results = await Promise.all(conversionsPromises);

    const texts = results.map((result) => result.data.text);

    this.createNoteUploads(texts);

    await scheduler.terminate();
  }

  createNoteUploads(texts: string[]): Promise<MySqlRawQueryResult> {
    return this.db
      .insert(noteUploadsTable)
      .values(texts.map((text) => ({ text })));
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
