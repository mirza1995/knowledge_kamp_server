import { User } from '@/decorators/user.decorator';
import { AuthGuard } from '@/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesParams } from '@/types/notes/NoteIdParams';
import { CreateNoteDto } from '@/dto/notes/create-note-dto';
import { UpdateNoteDto } from '@/dto/notes/update-note-dto';

@UseGuards(AuthGuard)
@Controller('notebooks/:notebookId/notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get('/:id')
  getNote(@User() user: User, @Param() params: NotesParams) {
    return this.notesService.getNote(params.id, params.notebookId, user.id);
  }

  @Get()
  getAllNotebooks(@User() user: User, @Param() params: NotesParams) {
    return this.notesService.getAllNotes(params.notebookId, user.id);
  }

  @Post()
  createNotebook(
    @User() user: User,
    @Body() createNoteDto: CreateNoteDto,
    @Param() params: NotesParams,
  ) {
    return this.notesService.createNote(
      createNoteDto,
      params.notebookId,
      user.id,
    );
  }

  @Post('/:id')
  updateNote(
    @User() user: User,
    @Body() updateNoteDto: UpdateNoteDto,
    @Param() params: NotesParams,
  ) {
    return this.notesService.updateNote(
      params.id,
      user.id,
      params.notebookId,
      updateNoteDto,
    );
  }

  @Delete('/:id')
  async deleteNote(@User() user: User, @Param() params: NotesParams) {
    const deleted = await this.notesService.deleteNote(
      params.id,
      params.notebookId,
      user.id,
    );

    if (deleted) {
      return deleted;
    }

    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
