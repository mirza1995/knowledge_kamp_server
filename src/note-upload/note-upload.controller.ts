import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotesDto } from '@/dto/create-notes-dto';
import { NoteUploadService } from './note-upload.service';

@Controller('note-upload')
export class NoteUploadController {
  constructor(private noteUploadService: NoteUploadService) {}

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post()
  createNote(@Body() createNotesDto: CreateNotesDto): string[] {
    this.noteUploadService.createNotesUpload(createNotesDto.urls);

    return createNotesDto.urls;
  }
}
