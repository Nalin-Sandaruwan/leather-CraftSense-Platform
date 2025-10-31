import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import type { ConfigType } from '@nestjs/config';
import refreshJwtConfig from 'src/config/refresh.jwt.config';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private readonly config: ConfigType<typeof refreshJwtConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // adapt if you use cookie
      secretOrKey: config.secret,
      passReqToCallback: false,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateJwtUser(payload.sub);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}