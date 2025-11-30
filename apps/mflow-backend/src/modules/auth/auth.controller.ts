import { Body, Controller, Ip, Post, Req, Res } from '@nestjs/common';
import { NewUserDto } from './dto/new-user.dto';
import AuthService from './auth.service';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { AuthLoginResponse, AuthRegistrationResponse } from '@repo/types';
import { Public } from '../../common/decorators/public.decorator';

@Controller('auth')
class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Public()
  @Post('/login')
  public async signIn(
    @Body() body: LoginDto,
    @Req() req: Request,
    @Ip() ip: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthLoginResponse> {
    const userAgent = req.headers['user-agent'];
    const { refreshToken, accessToken } = await this.authService.login(
      body,
      ip,
      userAgent,
    );

    res.cookie('refreshToken', refreshToken.token, {
      httpOnly: true,
      expires: refreshToken.expiresIn,
    });
    res.cookie('accessToken', accessToken.token, {
      httpOnly: true,
      expires: accessToken.expiresIn,
    });
    return null;
  }

  @Public()
  @Post('/registration')
  public async registration(
    @Body() body: NewUserDto,
    @Req() req: Request,
    @Ip() ip: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthRegistrationResponse> {
    const userAgent = req.headers['user-agent'];
    const { refreshToken, accessToken } = await this.authService.registration(
      body,
      ip,
      userAgent,
    );
    res.cookie('refreshToken', refreshToken.token, {
      httpOnly: true,
      expires: refreshToken.expiresIn,
    });
    res.cookie('accessToken', accessToken.token, {
      httpOnly: true,
      expires: accessToken.expiresIn,
    });

    return null;
  }
}

export default AuthController;
