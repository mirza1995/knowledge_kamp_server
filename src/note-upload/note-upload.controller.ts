import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateNotesDto } from '@/dto/create-notes-dto';
import { NoteUploadService } from './note-upload.service';
import { AuthGuard } from '@/guards/auth.guard';
import { User } from '@/decorators/user.decorator';
import { UploadsService } from '@/uploads/uploads.service';
import { UploadIdParam } from '@/types/uploads/UploadIdParam';
import { NoteUploadDTO } from '@/dto/noteUploads/note-upload-dto';
import { UploadDTO } from '@/dto/uploads/upload-dto';

@UseGuards(AuthGuard)
@Controller('notes-upload')
export class NoteUploadController {
  constructor(
    private noteUploadService: NoteUploadService,
    private uploadsService: UploadsService,
  ) {}

  @Get('/:id')
  getUploadedNotes(
    @User() user: User,
    @Param() params: UploadIdParam,
  ): Promise<NoteUploadDTO[]> {
    return this.noteUploadService.getUploadedNotes(params.id, user.id);
  }

  @Post()
  async createNote(
    @User() user: User,
    @Body() createNotesDto: CreateNotesDto,
  ): Promise<UploadDTO> {
    const upload = await this.uploadsService.createUpload(
      createNotesDto.urls.length,
      user.id,
    );
    this.noteUploadService.createNotesUpload(
      user.id,
      createNotesDto.urls,
      upload.id,
    );

    return UploadDTO.toDTO(upload);
  }
}
