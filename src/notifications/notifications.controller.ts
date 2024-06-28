import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { UpdateNotesLastNotificationDateDTO } from '@/dto/notifications/update-notes-last-notification-date-dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post()
  getNotesNotificationsContent() {
    return this.notificationsService.getNotesNotificationsContent();
  }

  @Post('/update')
  async updateNotesLastNotificationDate(
    @Body() notesDto: UpdateNotesLastNotificationDateDTO,
  ) {
    if (notesDto.key === process.env.EMAIL_SEND_API_KEY) {
      await this.notificationsService.updateNotesLastNotificationDate(notesDto);

      return { message: 'Success' };
    }

    return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }
}
