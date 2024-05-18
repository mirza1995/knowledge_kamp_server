import { noteTable } from '@/db/note';
import { CreateNoteDto } from '@/dto/notes/create-note-dto';
import { Note } from '@/dto/notes/note-dto';
import { UpdateNoteDto } from '@/dto/notes/update-note-dto';
import { DB, DbType } from '@/global/providers/db.provider';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class NotesService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getNote(id: string, notebookId: string, userId: string) {
    const notes = await this.db
      .select()
      .from(noteTable)
      .where(
        and(
          eq(noteTable.id, id),
          eq(noteTable.notebookId, notebookId),
          eq(noteTable.userId, userId),
        ),
      );

    if (notes.length !== 1) {
      throw new Error("Notebook doesn't exist");
    }
    return Note.toDTO(notes[0]);
  }

  async getAllNotes(notebookId: string, userId: string) {
    const notes = await this.db
      .select()
      .from(noteTable)
      .where(
        and(eq(noteTable.notebookId, notebookId), eq(noteTable.userId, userId)),
      );

    return notes.map((note) => Note.toDTO(note));
  }

  async createNote(noteDto: CreateNoteDto, notebookId: string, userId: string) {
    const newNote = await this.db
      .insert(noteTable)
      .values({ ...noteDto, notebookId, userId })
      .returning();

    return Note.toDTO(newNote[0]);
  }

  async createNotes(
    notes: CreateNoteDto[],
    notebookId: string,
    userId: string,
  ) {
    const newNotes = await this.db
      .insert(noteTable)
      .values(notes.map((note) => ({ ...note, notebookId, userId })))
      .returning();

    return newNotes.map((newNote) => Note.toDTO(newNote));
  }

  async updateNote(
    id: string,
    userId: string,
    notebookId: string,
    noteDto: UpdateNoteDto,
  ) {
    const updatedNotes = await this.db
      .update(noteTable)
      .set(noteDto)
      .where(
        and(
          eq(noteTable.id, id),
          eq(noteTable.userId, userId),
          eq(noteTable.notebookId, notebookId),
        ),
      )
      .returning();

    return Note.toDTO(updatedNotes[0]);
  }

  async deleteNote(id: string, notebookId: string, userId: string) {
    const deletedNote = await this.db
      .delete(noteTable)
      .where(
        and(
          eq(noteTable.id, id),
          eq(noteTable.userId, userId),
          eq(noteTable.notebookId, notebookId),
        ),
      )
      .returning();

    return !!deletedNote;
  }
}
