import { Module } from '@nestjs/common';
import { NoteUploadController } from './note-upload.controller';
import { NoteUploadService } from './note-upload.service';

@Module({
  imports: [],
  controllers: [NoteUploadController],
  providers: [NoteUploadService],
})
export class NoteUploadModule {}
