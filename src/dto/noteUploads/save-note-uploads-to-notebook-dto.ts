import { SaveNoteUpload } from '@/types/noteUploads/SaveNoteUpload';

export interface SaveNoteUploadsToNotebookDTO {
  notebookId: string;
  noteUploads: SaveNoteUpload[];
}
