import { Test, TestingModule } from '@nestjs/testing';
import { CreatedProductsController } from './created.products.controller';
import { CreatedProductsService } from './created.products.service';

describe('CreatedProductsController', () => {
  let controller: CreatedProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatedProductsController],
      providers: [CreatedProductsService],
    }).compile();

    controller = module.get<CreatedProductsController>(CreatedProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
