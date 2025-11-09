import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './staratagy/local.stratagy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './staratagy/jwt.stratagy';
import refreshJwtConfig from 'src/config/refresh.jwt.config';
import { RefreshTokenStrategy } from './staratagy/refresh.jwt.stratagy';
import { MailModule } from 'src/mail/mail.module';



@Module({
  imports:[
    UserModule,
    MailModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    // ConfigModule.forFeature(MailService)
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
  exports: [PassportModule, JwtModule]
})
export class AuthModule {}
