import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotesModule } from '@/notes/notes.module';
import { NotesService } from '@/notes/notes.service';
import { ResendModule } from 'nestjs-resend';

@Module({
  imports: [
    NotesModule,
    ResendModule.forRoot({
      apiKey: process.env.RESEND_API_KEY,
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotesService],
})
export class NotificationsModule {}
