import { Body, Controller, Ip, Post, Req, Res } from '@nestjs/common';
import AuthService from './auth.service';
import type { CookieOptions, Request, Response } from 'express';
import {
  AuthLoginResponse,
  AuthRegistrationResponse,
  LoginDto,
  NewUserDto,
} from '@repo/types';
import { Public } from '../../common/decorators/public.decorator';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  private getCookiesOptions = (expiresIn?: Date): CookieOptions => {
    return {
      httpOnly: true,
      expires: expiresIn,
      sameSite: 'none',
      secure: true,
    };
  };

  @Public()
  @Post('/login')
  public async signIn(
    @Body() body: LoginDto,
    @Req() req: Request,
    @Ip() ip: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthLoginResponse> {
    const userAgent = req.headers['user-agent'];
    const id = req.cookies.id as string | null | undefined;
    const deviceId = req.cookies.id as string | null;
    const { refreshToken, accessToken } = await this.authService.login(body, {
      id,
      ip,
      userAgent,
      deviceId: deviceId,
    });

    res.cookie(
      'refreshToken',
      refreshToken.token,
      this.getCookiesOptions(refreshToken.expiresIn),
    );
    res.cookie(
      'accessToken',
      accessToken.token,
      this.getCookiesOptions(accessToken.expiresIn),
    );
    res.cookie(
      'id',
      refreshToken.deviceId,
      this.getCookiesOptions(refreshToken.expiresIn),
    );
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
    const deviceId = req.cookies.id as string | null;
    const { refreshToken, accessToken } = await this.authService.registration(
      body,
      deviceId,
      ip,
      userAgent,
    );

    res.cookie(
      'refreshToken',
      refreshToken.token,
      this.getCookiesOptions(refreshToken.expiresIn),
    );
    res.cookie(
      'accessToken',
      accessToken.token,
      this.getCookiesOptions(accessToken.expiresIn),
    );
    res.cookie('id', refreshToken.deviceId, this.getCookiesOptions());

    return null;
  }

  @Post('/refresh')
  refresh() {
    //todo: Implement validation of the refresh token and creating a new access one;
  }
}

export default AuthController;
