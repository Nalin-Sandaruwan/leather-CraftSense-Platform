import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import mailConfig from 'src/config/mail.config';
import { MailController } from './mail.controller';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => mailConfig(), // call factory that reads process.env
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],

})
export class MailModule {}
