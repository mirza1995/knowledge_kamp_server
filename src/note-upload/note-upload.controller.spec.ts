import { Test, TestingModule } from '@nestjs/testing';
import { NoteUploadController } from './note-upload.controller';

describe('NoteUploadController', () => {
  let controller: NoteUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteUploadController],
    }).compile();

    controller = module.get<NoteUploadController>(NoteUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
