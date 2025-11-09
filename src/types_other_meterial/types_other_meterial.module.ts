import { Module } from '@nestjs/common';
import { TypesOtherMeterialService } from './types_other_meterial.service';
import { TypesOtherMeterialController } from './types_other_meterial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesOtherMeterial } from './entities/types_other_meterial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypesOtherMeterial])],
  controllers: [TypesOtherMeterialController],
  providers: [TypesOtherMeterialService],
})
export class TypesOtherMeterialModule {}
