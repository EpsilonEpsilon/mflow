import { Body, Controller, Ip, Post, Req, Res } from '@nestjs/common';
import AuthService from './auth.service';
import type { CookieOptions, Response } from 'express';
import {
  AuthLoginResponse,
  AuthRegistrationResponse,
  LoginDto,
  NewUserDto,
} from '@repo/types';
import { Public } from '../../common/decorators/public.decorator';
import type { CustomRequest } from '../../types/express';
import { TokensObject } from './types';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  private formatRequestMeta(req: CustomRequest) {
    const userAgent = req.headers['user-agent'];
    const deviceId = req.cookies.id;

    return { userAgent, deviceId };
  }

  private getCookiesOptions = (expiresIn?: Date): CookieOptions => {
    return {
      httpOnly: true,
      expires: expiresIn,
      sameSite: 'none',
      secure: true,
    };
  };

  private setTokensToTheCookie(
    res: Response,
    tokens: Omit<TokensObject, 'deviceId'>,
  ) {
    const { refreshToken, accessToken } = tokens;
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
  }

  /**
   * @throws {import('@nestjs/common').UnauthorizedException}
   */
  @Public()
  @Post('/login')
  public async signIn(
    @Body() body: LoginDto,
    @Req() req: CustomRequest,
    @Ip() ip: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthLoginResponse> {
    const meta = this.formatRequestMeta(req);
    const { refreshToken, accessToken } = await this.authService.login(body, {
      ip,
      ...meta,
    });
    this.setTokensToTheCookie(res, { refreshToken, accessToken });
    return null;
  }

  /**
   * @throws {import('@nestjs/common').UnauthorizedException}
   */
  @Public()
  @Post('/registration')
  public async registration(
    @Body() body: NewUserDto,
    @Req() req: CustomRequest,
    @Ip() ip: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthRegistrationResponse> {
    const meta = this.formatRequestMeta(req);
    const { refreshToken, accessToken } = await this.authService.registration(
      body,
      { ip, ...meta },
    );
    this.setTokensToTheCookie(res, { refreshToken, accessToken });
    return null;
  }

  /**
   * @throws {import('@nestjs/common').UnauthorizedException}
   */
  @Post('/verify')
  public async verify(@Req() req: CustomRequest): Promise<void> {
    await this.authService.verify({ accessToken: req.cookies.accessToken });
    return;
  }

  /**
   * @throws {import('@nestjs/common').UnauthorizedException}
   */
  @Post('/refresh')
  public refresh() {
    //todo: Implement validation of the refresh token and creating a new access one;
  }
}

export default AuthController;
