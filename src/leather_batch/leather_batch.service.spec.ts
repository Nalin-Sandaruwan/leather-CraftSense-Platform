import { Test, TestingModule } from '@nestjs/testing';
import { LeatherBatchService } from './leather_batch.service';

describe('LeatherBatchService', () => {
  let service: LeatherBatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeatherBatchService],
    }).compile();

    service = module.get<LeatherBatchService>(LeatherBatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
