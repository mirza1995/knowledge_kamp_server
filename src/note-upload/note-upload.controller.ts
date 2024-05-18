import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateNotesDto } from '@/dto/create-notes-dto';
import { NoteUploadService } from './note-upload.service';
import { AuthGuard } from '@/guards/auth.guard';
import { User } from '@/decorators/user.decorator';
import { UploadsService } from '@/uploads/uploads.service';
import { UploadIdParam } from '@/types/uploads/UploadIdParam';
import { NoteUploadDTO } from '@/dto/noteUploads/note-upload-dto';
import { UploadDTO } from '@/dto/uploads/upload-dto';
import { NoteUploadIdParam } from '@/types/noteUploads/NoteUploadIdParam';
import { UpdateNoteUploadDTO } from '@/dto/noteUploads/update-note-upload-dto';
import { SaveNoteUploadsToNotebookDTO } from '@/dto/noteUploads/save-note-uploads-to-notebook-dto';

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

  @Post('/save-to-notebook')
  saveNoteUploadsToNotebook(
    @User() user: User,
    @Body() saveNoteUploadsToNotebook: SaveNoteUploadsToNotebookDTO,
  ) {
    return this.noteUploadService.saveNoteUploadsToNotebook(
      user.id,
      saveNoteUploadsToNotebook,
    );
  }

  @Post('/:id')
  updateNotebook(
    @User() user: User,
    @Body() updateNoteUploadDto: UpdateNoteUploadDTO,
    @Param() params: NoteUploadIdParam,
  ) {
    return this.noteUploadService.updateNoteUpload(
      params.id,
      user.id,
      updateNoteUploadDto,
    );
  }
}
