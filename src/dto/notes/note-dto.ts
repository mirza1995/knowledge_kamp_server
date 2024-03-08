import { noteTable } from '@/db/note';

export class Note {
  id: string;
  title: string;
  content: string;

  static toDTO(noteEntity: typeof noteTable.$inferSelect) {
    return {
      id: noteEntity.id,
      title: noteEntity.title,
      content: noteEntity.content,
      dateCreated: noteEntity.dateCreated,
    };
  }
}
