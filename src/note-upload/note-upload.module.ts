import { Module } from '@nestjs/common';
import { NoteUploadController } from './note-upload.controller';
import { NoteUploadService } from './note-upload.service';
import { UploadsService } from '@/uploads/uploads.service';
import { UploadsModule } from '@/uploads/uploads.module';

@Module({
  imports: [UploadsModule],
  controllers: [NoteUploadController],
  providers: [NoteUploadService, UploadsService],
})
export class NoteUploadModule {}
