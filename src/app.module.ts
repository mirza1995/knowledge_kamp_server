import { Global, Module } from '@nestjs/common';
import { GlobalModule } from '@/global/global.module';
import { NoteUploadModule } from './note-upload/note-upload.module';
import { ConfigModule } from '@nestjs/config';
import { NotebookModule } from './notebook/notebook.module';
import { NotesController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';
import { NotesModule } from './notes/notes.module';
import { UploadsModule } from './uploads/uploads.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GlobalModule,
    NoteUploadModule,
    NotebookModule,
    NotesModule,
    UploadsModule,
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {}
