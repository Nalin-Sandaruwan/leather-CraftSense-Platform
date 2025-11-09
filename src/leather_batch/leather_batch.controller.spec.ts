import { Test, TestingModule } from '@nestjs/testing';
import { LeatherBatchController } from './leather_batch.controller';
import { LeatherBatchService } from './leather_batch.service';

describe('LeatherBatchController', () => {
  let controller: LeatherBatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeatherBatchController],
      providers: [LeatherBatchService],
    }).compile();

    controller = module.get<LeatherBatchController>(LeatherBatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
