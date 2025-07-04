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
import { NotebookService } from './notebook.service';
import { CreateNotebookDto } from '@/dto/notebook/create-notebook-dto';
import { NotebookIdParam } from '@/types/notebook/NotebookIdParams';
import { Notebook } from '@/dto/notebook/notebook-dto';
import { User } from '@/decorators/user.decorator';
import { UpdateNotebookDto } from '@/dto/notebook/update-notebook-dto';

@UseGuards(AuthGuard)
@Controller('notebooks')
export class NotebookController {
  constructor(private notebookService: NotebookService) {}

  @Get('/:id')
  getNotebook(
    @User() user: User,
    @Param() params: NotebookIdParam,
  ): Promise<Notebook> {
    return this.notebookService.getNotebook(params.id, user.id);
  }

  @Get()
  getAllNotebooks(@User() user: User): Promise<Notebook[]> {
    return this.notebookService.getAllNotebooks(user.id);
  }

  @Post()
  createNotebook(
    @User() user: User,
    @Body() createNotebookDto: CreateNotebookDto,
  ) {
    return this.notebookService.createNotebook(createNotebookDto, user);
  }

  @Post('/:id')
  updateNotebook(
    @User() user: User,
    @Body() updateNotebookDto: UpdateNotebookDto,
    @Param() params: NotebookIdParam,
  ) {
    return this.notebookService.updateNotebook(
      params.id,
      user.id,
      updateNotebookDto,
    );
  }

  @Delete('/:id')
  async deleteNotebook(@User() user: User, @Param() params: NotebookIdParam) {
    const deleted = await this.notebookService.deleteNotebook(
      params.id,
      user.id,
    );

    if (deleted) {
      return deleted;
    }

    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
