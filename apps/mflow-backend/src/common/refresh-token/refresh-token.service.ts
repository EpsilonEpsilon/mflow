import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RefreshToken } from './entitites/refresh-token.enetity';
import { RefreshTokenPayload } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import EncryptionService from '../encryption/encryption.service';
import UsersService from '../../modules/users/users.service';

@Injectable()
class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private encryptionService: EncryptionService,
    private userService: UsersService,
  ) {}

  public async create(payload: RefreshTokenPayload) {
    const token = this.jwtService.sign<RefreshTokenPayload>(payload, {
      expiresIn: this.configService.get<number>('jwt.accessToken.expiresIn'),
      secret: this.configService.get<string>('jwt.accessToken.secret'),
    });
    const hash = await this.encryptionService.hash(token);
    const user = await this.userService.findOneByUsername(payload.username);
    await this.refreshTokenRepository.save({
      tokenHash: hash,
      ...payload,
      user: user,
    });
    return { accessToken: token };
  }
}

export default RefreshTokenService;
