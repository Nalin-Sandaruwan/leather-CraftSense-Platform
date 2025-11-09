import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'src/user/user.service';

import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import { JwtPayload } from './types/jwt.paylode.type';
import refreshJwtConfig from 'src/config/refresh.jwt.config';
import { isString } from 'class-validator';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { role } from './enums/roles.enum';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
    private readonly mailService: MailService,

    private readonly UserService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.UserRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
    const user = await this.UserRepository.create(createUserDto);
    await this.UserRepository.save(user);
    const { accessToken, refreshToken } = await this.generateTokens(
      user.uId,
      role.MANAGER,
    );
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.UserService.updateHashedRefreshToken(
      user.uId.toString(),
      hashedRefreshToken,
    );

    await this.mailService.sendWelcomeEmail(user.email, user.name);

    return {
      userId: user.uId,
      accessToken,
      refreshToken,
    };
  }

  //use in local strategy
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.UserService.findOne(email);
    if (!user) {
      throw new Error('User  Not found');
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return {
      id: user.uId,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async login(userId: string) {
    const user = await this.UserService.findOneById(userId.toString());
    const { accessToken, refreshToken } = await this.generateTokens(
      parseInt(userId),
      user.role,
    );
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.UserService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      userId: user.uId,
      refreshToken,
      accessToken,
    };
  }

  async refreshToken(user_Id: string) {
    const user = await this.UserService.findOneById(user_Id.toString());
    const { accessToken, refreshToken } = await this.generateTokens(
      parseInt(user_Id),
      user.role,
    );
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.UserService.updateHashedRefreshToken(
      user_Id,
      hashedRefreshToken,
    );
    return {
      userId: user.uId,
      refreshToken,
      accessToken,
    };
  }

  async generateTokens(userId: number, userRole: role) {
    const payload: JwtPayload = {
      sub: userId,
      role: userRole,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return { accessToken, refreshToken };
  }

  //jwt starategy use that 
  async validateJwtUser(userId: number): Promise<any> {
    const user = await this.UserService.findOneById(userId.toString());
    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }
    return user;
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.UserService.findOneById(userId.toString());

    if (!user || !isString(user.refreshToken)) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return { id: userId };
  }
}
