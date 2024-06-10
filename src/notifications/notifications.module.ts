import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotesModule } from '@/notes/notes.module';
import { NotesService } from '@/notes/notes.service';

@Module({
  imports: [NotesModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotesService],
})
export class NotificationsModule {}
