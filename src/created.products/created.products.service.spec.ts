import { Test, TestingModule } from '@nestjs/testing';
import { CreatedProductsService } from './created.products.service';

describe('CreatedProductsService', () => {
  let service: CreatedProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatedProductsService],
    }).compile();

    service = module.get<CreatedProductsService>(CreatedProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
