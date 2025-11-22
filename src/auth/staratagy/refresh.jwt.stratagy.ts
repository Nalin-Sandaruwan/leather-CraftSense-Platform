import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import type { ConfigType } from '@nestjs/config';
import refreshJwtConfig from 'src/config/refresh.jwt.config';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-Jwt') {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private readonly config: ConfigType<typeof refreshJwtConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['refresh_token'];
          }
          return token;
        },
      ]),
      secretOrKey: config.secret as string,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.cookies?.['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found in cookies');
    }

    const userIdNum = Number(payload.sub);
    if (Number.isNaN(userIdNum)) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.authService.validateJwtUser(payload.sub);
    if (!user) throw new UnauthorizedException();
    return this.authService.validateRefreshToken(userIdNum, refreshToken);
  }
}