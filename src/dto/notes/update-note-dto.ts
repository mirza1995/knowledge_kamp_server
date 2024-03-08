import { IsNotEmpty, Length } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  @Length(3)
  title: string;

  content: string;
}
