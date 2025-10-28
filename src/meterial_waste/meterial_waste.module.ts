import { Module } from '@nestjs/common';
import { MeterialWasteService } from './meterial_waste.service';
import { MeterialWasteController } from './meterial_waste.controller';

@Module({
  controllers: [MeterialWasteController],
  providers: [MeterialWasteService],
})
export class MeterialWasteModule {}
