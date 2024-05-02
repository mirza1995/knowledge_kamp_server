import { uploadsTable } from '@/db/uploads';

export class UploadDTO {
  id: string;
  status: string;
  items: number;
  dateCreated: Date;

  static toDTO(entity: typeof uploadsTable.$inferSelect) {
    return {
      id: entity.id,
      status: entity.status,
      items: entity.items,
      dateCreated: entity.dateCreated,
    };
  }
}
