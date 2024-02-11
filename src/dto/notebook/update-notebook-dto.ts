import { IsNotEmpty, Length } from 'class-validator';

export class UpdateNotebookDto {
  @IsNotEmpty()
  @Length(3)
  name: string;

  description: string;
}
