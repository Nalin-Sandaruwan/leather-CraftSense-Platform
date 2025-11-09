import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/orm.config';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { config } from 'dotenv';
import { MeterialsModule } from './meterials/meterials.module';
import { MailModule } from './mail/mail.module';
import { LeatherBatchModule } from './leather_batch/leather_batch.module';
import { OtherMeterialModule } from './other_meterial/other_meterial.module';


@Module({
  imports: [
    // load environment first
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    // then initialize TypeORM with the config factory

    TypeOrmModule.forRoot(ormConfig()),
    UserModule,
    AuthModule,
    MeterialsModule,
    MailModule,
    LeatherBatchModule,
    OtherMeterialModule,
  


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
