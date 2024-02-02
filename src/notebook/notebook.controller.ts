import { AuthGuard } from '@/guards/auth.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { NotebookService } from './notebook.service';
import { CreateNotebookDto } from '@/dto/notebook/create-notebook-dto';
import { NotebookIdParam } from '@/types/notebook/NotebookIdParams';
import { Notebook } from '@/dto/notebook/notebook-dto';
import { User } from '@/decorators/user.decorator';

@UseGuards(AuthGuard)
@Controller('notebooks')
export class NotebookController {
  constructor(private notebookService: NotebookService) {}

  @Get(':id')
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
    return this.notebookService.createNotebook(createNotebookDto, user.id);
  }
}
