import { Module } from '@nestjs/common';
import { OtherMeterialService } from './other_meterial.service';
import { OtherMeterialController } from './other_meterial.controller';

@Module({
  controllers: [OtherMeterialController],
  providers: [OtherMeterialService],
})
export class OtherMeterialModule {}
