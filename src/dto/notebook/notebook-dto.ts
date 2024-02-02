import { notebookTable } from '@/db/notebook';

export class Notebook {
  id: string;
  name: string;
  description: string;

  static toDTO(notebookEntity: typeof notebookTable.$inferSelect) {
    return {
      id: notebookEntity.id,
      name: notebookEntity.name,
      description: notebookEntity.description,
      dateCreated: notebookEntity.dateCreated,
    };
  }
}
