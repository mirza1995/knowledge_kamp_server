import { IsNotEmpty, Length } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @Length(3)
  title: string;

  content: string;
}
