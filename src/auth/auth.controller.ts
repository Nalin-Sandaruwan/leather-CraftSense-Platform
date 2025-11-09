import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './gards/local.auth.gards';
import { RefreshAuthGuard } from './gards/refresh/refreh.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    // private readonly mailService: MailService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user);

    const user = await this.authService.login(req.user.id);
    return {
      user
    }
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signUp(createUserDto);
    return {
      user
    }
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req: Request & { user: { id: string } }) {
    return this.authService.refreshToken(req.user.id);
  }


  
  // Add this method to AuthController for testing

}