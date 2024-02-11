import { notebookTable } from '@/db/notebook';
import { CreateNotebookDto } from '@/dto/notebook/create-notebook-dto';
import { Notebook } from '@/dto/notebook/notebook-dto';
import { UpdateNotebookDto } from '@/dto/notebook/update-notebook-dto';
import { DB, DbType } from '@/global/providers/db.provider';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class NotebookService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getNotebook(id: string, userId: string) {
    const notebook = await this.db
      .select()
      .from(notebookTable)
      .where(and(eq(notebookTable.id, id), eq(notebookTable.userId, userId)));

    if (notebook.length !== 1) {
      throw new Error("Notebook doesn't exist");
    }
    return Notebook.toDTO(notebook[0]);
  }

  async getAllNotebooks(userId: string) {
    const notebooks = await this.db
      .select()
      .from(notebookTable)
      .where(eq(notebookTable.userId, userId));

    return notebooks.map((notebook) => Notebook.toDTO(notebook));
  }

  async createNotebook(notebookDto: CreateNotebookDto, userId: string) {
    const id: string = uuid();

    await this.db.insert(notebookTable).values({ id, userId, ...notebookDto });

    return this.getNotebook(id, userId);
  }

  async updateNotebook(
    id: string,
    userId: string,
    notebookDto: UpdateNotebookDto,
  ) {
    await this.db
      .update(notebookTable)
      .set(notebookDto)
      .where(and(eq(notebookTable.id, id), eq(notebookTable.userId, userId)));

    return this.getNotebook(id, userId);
  }

  async deleteNotebook(id: string, userId: string) {
    await this.db
      .delete(notebookTable)
      .where(and(eq(notebookTable.id, id), eq(notebookTable.userId, userId)));

    return true;
  }
}
