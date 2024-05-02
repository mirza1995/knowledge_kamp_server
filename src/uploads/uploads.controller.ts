import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';
import { User } from '@/decorators/user.decorator';
import { UploadsService } from '@/uploads/uploads.service';
import { UploadIdParam } from '@/types/uploads/UploadIdParam';
import { UploadDTO } from '@/dto/uploads/upload-dto';

@UseGuards(AuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Get()
  getUploadedNotes(@User() user: User): Promise<UploadDTO[]> {
    return this.uploadsService.getUploads(user.id);
  }

  @Get('/:id')
  getUploadedNote(
    @User() user: User,
    @Param() params: UploadIdParam,
  ): Promise<UploadDTO> {
    return this.uploadsService.getUpload(params.id, user.id);
  }

  @Delete('/:id')
  async deleteNotebook(@User() user: User, @Param() params: UploadIdParam) {
    const deleted = await this.uploadsService.deleteUpload(params.id, user.id);

    if (deleted) {
      return deleted;
    }

    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
