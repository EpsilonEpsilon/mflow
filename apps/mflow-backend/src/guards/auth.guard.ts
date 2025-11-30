import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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
    const tokens = this.extractTokens(request);
    request['user'] = await this.tokenService.verifyAccessToken(
      tokens.accessToken,
    );

    return true;
  }

  private extractTokens(request: Request) {
    const accessToken = request.cookies.accessToken as string | null;
    const refreshToken = request.cookies.refreshToken as string | null;
    return { accessToken, refreshToken };
  }
}
