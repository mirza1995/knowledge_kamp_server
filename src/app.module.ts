import { Global, Module } from '@nestjs/common';
import { GlobalModule } from '@/global/global.module';
import { NoteUploadModule } from './note-upload/note-upload.module';
import { ConfigModule } from '@nestjs/config';
import { NotebookModule } from './notebook/notebook.module';
import { NotesController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';
import { NotesModule } from './notes/notes.module';
import { UploadsModule } from './uploads/uploads.module';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationsService } from './notifications/notifications.service';
import { UsersModule } from './users/users.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GlobalModule,
    NoteUploadModule,
    NotebookModule,
    NotesModule,
    UploadsModule,
    NotificationsModule,
    UsersModule,
  ],
  controllers: [NotesController, NotificationsController],
  providers: [NotesService, NotificationsService],
})
export class AppModule {}
