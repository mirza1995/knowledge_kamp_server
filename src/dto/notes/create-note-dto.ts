import { IsNotEmpty, Length } from 'class-validator';

export class CreateNoteDto {
  title?: string;

  content: string;
}
