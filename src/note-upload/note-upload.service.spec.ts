import { Test, TestingModule } from '@nestjs/testing';
import { NoteUploadService } from './note-upload.service';

describe('NoteUploadService', () => {
  let service: NoteUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteUploadService],
    }).compile();

    service = module.get<NoteUploadService>(NoteUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
