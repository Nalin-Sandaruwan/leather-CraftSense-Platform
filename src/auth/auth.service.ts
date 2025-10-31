import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from 'src/user/user.service';

import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import { JwtPayload } from './types/jwt.paylode.type';
import refreshJwtConfig from 'src/config/refresh.jwt.config';


@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY) private refreshTokenConfig:ConfigType<typeof refreshJwtConfig>
    // @Inject(refreshJwtConfig.KEY)
    // private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}



  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.UserService.findOne(email);

    if (!user) {
      throw new Error('User  Not found');
    }

    const isPasswordValid = await compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return { id: user.uId, email: user.email, name: user.name, role: user.role };
  }


  async login (userId:Number){
      const user = await this.UserService.findOneById(userId.toString());
      const payload:JwtPayload = { sub: user.uId };
      const token = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
      });

    return {
      userId: user.uId,
      refreshToken,
      token,
    }
  }

    async refreshToken(userId: string) {
    const payload: JwtPayload = { sub:parseInt(userId) };
    const token = this.jwtService.sign(payload);
    return { token };

  }

  async validateJwtUser(userId: number): Promise<any> {
    const user = await this.UserService.findOneById(userId.toString());

    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }
    return user;
  }
}
