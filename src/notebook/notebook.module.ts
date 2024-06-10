import { Module } from '@nestjs/common';
import { NotebookController } from './notebook.controller';
import { NotebookService } from './notebook.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '@/users/users.service';

@Module({
  imports: [UsersModule],
  controllers: [NotebookController],
  providers: [NotebookService, UsersService],
})
export class NotebookModule {}
