import { Test, TestingModule } from '@nestjs/testing';
import { MeterialsController } from './meterials.controller';
import { MeterialsService } from './meterials.service';

describe('MeterialsController', () => {
  let controller: MeterialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeterialsController],
      providers: [MeterialsService],
    }).compile();

    controller = module.get<MeterialsController>(MeterialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
