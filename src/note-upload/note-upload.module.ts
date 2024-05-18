import { Module } from '@nestjs/common';
import { NoteUploadController } from './note-upload.controller';
import { NoteUploadService } from './note-upload.service';
import { UploadsService } from '@/uploads/uploads.service';
import { UploadsModule } from '@/uploads/uploads.module';
import { NotesService } from '@/notes/notes.service';
import { NotesModule } from '@/notes/notes.module';

@Module({
  imports: [UploadsModule, NotesModule],
  controllers: [NoteUploadController],
  providers: [NoteUploadService, UploadsService, NotesService],
})
export class NoteUploadModule {}
