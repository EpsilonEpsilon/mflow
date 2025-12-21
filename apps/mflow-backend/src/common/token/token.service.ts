import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { RefreshToken } from './entitites/refresh-token.enetity';
import {
  AccessTokenPayload,
  RefreshTokenObject,
  RefreshTokenPayload,
  TokenObject,
} from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import EncryptionService from '../encryption/encryption.service';
import UsersService from '../users/users.service';
import { User } from '../users/entitites/user.entitity';
import { addMilliseconds } from 'date-fns';
import type { StringValue } from 'ms';
import ms from 'ms';
import { nanoid } from 'nanoid';

@Injectable()
class TokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private encryptionService: EncryptionService,
    private userService: UsersService,
  ) {}

  public async createRefreshToken(
    payload: RefreshTokenPayload,
    user?: User,
    manager?: EntityManager,
  ): Promise<RefreshTokenObject> {
    const refreshTokenRepository = manager
      ? manager.getRepository(RefreshToken)
      : this.refreshTokenRepository;
    const expireIn = this.configService.get<StringValue>(
      'jwt.refresh.expiresIn',
    );

    const token = await this.jwtService.signAsync<RefreshTokenPayload>(
      payload,
      {
        expiresIn: expireIn,
        secret: this.configService.get<string>('jwt.refresh.secret'),
      },
    );
    const hash = await this.encryptionService.hash(token);
    const _user =
      user ?? (await this.userService.findOneByUsername(token, manager));
    const deviceId = nanoid();
    await refreshTokenRepository.save({
      tokenHash: hash,
      ...payload,
      user: _user,
      deviceId,
    });
    return {
      token,
      expiresIn: addMilliseconds(new Date(), ms(expireIn)),
      deviceId,
    };
  }

  public async createAccessToken(
    refreshToken: string,
    payload: AccessTokenPayload,
  ): Promise<TokenObject> {
    const expireIn = this.configService.get<StringValue>(
      'jwt.access.expiresIn',
    );
    const token = await this.jwtService.signAsync<AccessTokenPayload>(payload, {
      expiresIn: this.configService.get<number>('jwt.access.expiresIn'),
      secret: this.configService.get<string>('jwt.access.secret'),
    });

    return { token, expiresIn: addMilliseconds(new Date(), ms(expireIn)) };
  }

  public async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<AccessTokenPayload>(
        token,
        {
          secret: this.configService.get<string>('jwt.access.secret'),
        },
      );

      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  public async verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        token,
        {
          secret: this.configService.get<string>('jwt.refresh.secret'),
        },
      );

      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }
}

export default TokenService;
