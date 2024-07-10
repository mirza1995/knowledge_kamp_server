import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationsDTO } from '@/dto/notifications/send-notification-dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  async sendNotifications(@Query() params: SendNotificationsDTO) {
    if (params.key === process.env.EMAIL_SEND_API_KEY) {
      await this.notificationsService.sendNotifications();

      return { message: 'Success' };
    }

    return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }
}
