import { noteUploadsTable } from '@/db/noteUpload';

export class NoteUploadDTO {
  id: string;
  uploadId: string;
  text: string;

  static toDTO(entity: typeof noteUploadsTable.$inferSelect) {
    return {
      id: entity.id,
      uploadId: entity.uploadId,
      text: entity.text,
    };
  }
}
