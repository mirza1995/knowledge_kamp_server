import { Global, Module } from '@nestjs/common';
import { GlobalModule } from '@/global/global.module';
import { NoteUploadModule } from './note-upload/note-upload.module';
import { ConfigModule } from '@nestjs/config';
import { NotebookModule } from './notebook/notebook.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GlobalModule,
    NoteUploadModule,
    NotebookModule,
  ],
})
export class AppModule {}
