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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // adapt if you use cookie
      secretOrKey: config.secret as string,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req:Request, payload: any) {
    const refreshToken = req.get('authorization')?.replace("Bearer", "").trim();
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const userIdNum = Number(payload.sub);
    if (Number.isNaN(userIdNum)) {
      throw new UnauthorizedException('Invalid token payload');
    }

    // const user = await this.authService.validateJwtUser(payload.sub);
    // if (!user) throw new UnauthorizedException();
    return this.authService.validateRefreshToken(userIdNum, refreshToken);
  }
}