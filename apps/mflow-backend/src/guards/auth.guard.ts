import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../common/decorators/public.decorator';
import { Request } from 'express';
import TokenService from '../common/token/token.service';
import { CustomRequest } from '../types/express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<CustomRequest>();
    const cookies = this.extractCookies(request);
    if (!cookies.deviceId) throw new UnauthorizedException();
    request['user'] = await this.tokenService.verifyAccessToken(
      cookies.accessToken,
    );

    return true;
  }

  private extractCookies(request: Request) {
    const accessToken = request.cookies.accessToken as string | null;
    const refreshToken = request.cookies.refreshToken as string | null;
    const deviceId = request.cookies.id as string | null;
    return { accessToken, refreshToken, deviceId };
  }
}
