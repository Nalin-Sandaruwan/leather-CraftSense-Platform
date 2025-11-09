import { forwardRef, Module } from '@nestjs/common';
import { OtherMeterialService } from './other_meterial.service';
import { OtherMeterialController } from './other_meterial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OtherMeterial } from './entities/other_meterial.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([OtherMeterial])],
  controllers: [OtherMeterialController],
  providers: [OtherMeterialService],
 
})
export class OtherMeterialModule {}
