import { Module } from '@nestjs/common';
import { MeterialsService } from './meterials.service';
import { MeterialsController } from './meterials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meterial } from './entities/meterial.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meterial]), // <-- register repository provider
  ],
  controllers: [MeterialsController],
  providers: [MeterialsService],
})
export class MeterialsModule {}
