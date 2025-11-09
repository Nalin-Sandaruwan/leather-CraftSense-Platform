import { Test, TestingModule } from '@nestjs/testing';
import { TypesOtherMeterialController } from './types_other_meterial.controller';
import { TypesOtherMeterialService } from './types_other_meterial.service';

describe('TypesOtherMeterialController', () => {
  let controller: TypesOtherMeterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypesOtherMeterialController],
      providers: [TypesOtherMeterialService],
    }).compile();

    controller = module.get<TypesOtherMeterialController>(TypesOtherMeterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
