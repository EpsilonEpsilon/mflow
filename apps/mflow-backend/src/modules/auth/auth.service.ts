import { BadRequestException, Injectable } from '@nestjs/common';
import UsersService from '../../common/users/users.service';
import EncryptionService from '../../common/encryption/encryption.service';
import TokenService from '../../common/token/token.service';
import { User } from '../../common/users/entitites/user.entitity';
import { DataSource, EntityManager } from 'typeorm';
import { LoginDto, NewUserDto } from '@repo/types';

@Injectable()
class AuthService {
  constructor(
    private readonly userService: UsersService,

    private readonly encryptionService: EncryptionService,
    private tokenService: TokenService,
    private dataSource: DataSource,
  ) {}

  private async createAuthTokens(
    data: {
      user: User;
      ip?: string;
      userAgent?: string;
    },
    manager?: EntityManager,
  ) {
    const refreshToken = await this.tokenService.createRefreshToken(
      {
        sub: data.user.id,
        ip: data.ip,
        userAgent: data.userAgent,
        username: data.user.username,
      },
      data.user,
      manager,
    );
    const accessToken = await this.tokenService.createAccessToken(
      refreshToken.token,
      {
        sub: data.user.id,
        username: data.user.username,
      },
    );

    return { refreshToken, accessToken, deviceId: refreshToken.deviceId };
  }

  public async registration(data: NewUserDto, ip?: string, userAgent?: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userService.findOneByUsername(data.username);
      if (user) throw new BadRequestException('Username is taken');
      const hashedPassword = await this.encryptionService.hash(data.password);
      const userRecord = await this.userService.createNewUser(
        {
          username: data.username,
          hashPassword: hashedPassword,
        },
        queryRunner.manager,
      );
      return this.createAuthTokens({ user: userRecord, ip, userAgent });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  public async login(data: LoginDto, ip?: string, userAgent?: string) {
    const user = await this.userService.findOneByUsername(data.username);
    if (!user) throw new BadRequestException('User is not exist');
    const isPasswordsEqual = await this.encryptionService.compare(
      data.password,
      user.hashPassword,
    );
    if (!isPasswordsEqual) throw new BadRequestException('User is not exist');
    return this.createAuthTokens({ user, ip, userAgent });
  }
}

export default AuthService;
