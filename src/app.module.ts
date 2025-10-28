import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/orm.config';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeterialWasteModule } from './meterial_waste/meterial_waste.module';

@Module({
  imports: [
    // load environment first
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    // then initialize TypeORM with the config factory
    TypeOrmModule.forRoot(ormConfig()),
    UserModule,
    MeterialWasteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
