import { notebookTable } from '@/db/notebook';
import { CreateNotebookDto } from '@/dto/notebook/create-notebook-dto';
import { Notebook } from '@/dto/notebook/notebook-dto';
import { UpdateNotebookDto } from '@/dto/notebook/update-notebook-dto';
import { DB, DbType } from '@/global/providers/db.provider';
import { UsersService } from '@/users/users.service';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq, desc } from 'drizzle-orm';

@Injectable()
export class NotebookService {
  constructor(
    @Inject(DB) private readonly db: DbType,
    private readonly usersService: UsersService,
  ) {}

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
      .where(eq(notebookTable.userId, userId))
      .orderBy(desc(notebookTable.dateUpdated));

    return notebooks.map((notebook) => Notebook.toDTO(notebook));
  }

  async createNotebook(notebookDto: CreateNotebookDto, user: User) {
    const newNotebook = await this.db
      .insert(notebookTable)
      .values({ userId: user.id, ...notebookDto })
      .returning();

    await this.usersService.saveUserIfNotPresent(user);

    return Notebook.toDTO(newNotebook[0]);
  }

  async updateNotebook(
    id: string,
    userId: string,
    notebookDto: UpdateNotebookDto,
  ) {
    await this.db
      .update(notebookTable)
      .set({ ...notebookDto, dateUpdated: new Date() })
      .where(and(eq(notebookTable.id, id), eq(notebookTable.userId, userId)));

    return this.getNotebook(id, userId);
  }

  async deleteNotebook(id: string, userId: string) {
    const deletedNotebook = await this.db
      .delete(notebookTable)
      .where(and(eq(notebookTable.id, id), eq(notebookTable.userId, userId)))
      .returning();

    return !!deletedNotebook;
  }
}
