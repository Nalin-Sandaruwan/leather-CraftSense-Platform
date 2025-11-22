import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Response, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './gards/local.auth.gards';
import { RefreshAuthGuard } from './gards/refresh/refreh.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { type Response as ApiResponse } from 'express';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    // private readonly mailService: MailService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res: ApiResponse) {
    console.log(req.user);

    const user = await this.authService.login(req.user.id);

    res.cookie('access_token', user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax', // Adjust based on your requirements
      path: '/',
    });

    res.cookie('refresh_token', user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax', // Adjust based on your requirements
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ user });
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
  async refreshToken(@Req() req: Request & { user: { id: string } }, @Response() res: ApiResponse) {
    const user = await this.authService.refreshToken(req.user.id);

    res.cookie('access_token', user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax', // Adjust based on your requirements
      path: '/',
    });

    res.cookie('refresh_token', user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax', // Adjust based on your requirements
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie('refreshed_at', new Date().toISOString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax', // Adjust based on your requirements
      path: '/',
    });

    res.json({ accessToken: user.accessToken, refreshToken: user.refreshToken });
  }



  // Add this method to AuthController for testing

}