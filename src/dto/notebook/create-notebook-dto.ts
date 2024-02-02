import { IsNotEmpty, Length } from 'class-validator';

export class CreateNotebookDto {
  @IsNotEmpty()
  @Length(3)
  name: string;

  description: string;
}
