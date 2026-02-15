import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import UsersService from '../../common/users/users.service';
import EncryptionService from '../../common/encryption/encryption.service';
import TokenService from '../../common/token/token.service';
import { User } from '../../common/users/entitites/user.entitity';
import { DataSource, EntityManager } from 'typeorm';
import { LoginDto, NewUserDto } from '@repo/types';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthTokenMeta, LoginMeta, RegistrationMeta } from './types';

@Injectable()
class AuthService implements OnModuleInit {
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UsersService,
    private readonly encryptionService: EncryptionService,
    private tokenService: TokenService,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    await this.runCleanUpTokensTask();
  }

  private async createAuthTokens(
    user: User,
    meta: AuthTokenMeta,
    manager?: EntityManager,
  ) {
    const refreshToken = await this.tokenService.createRefreshToken(
      {
        sub: user.id,
        ip: meta.ip,
        userAgent: meta.userAgent,
        username: user.username,
      },
      user,
      manager,
    );
    const accessToken = await this.tokenService.createAccessToken(
      refreshToken.token,
      {
        sub: user.id,
        username: user.username,
      },
    );

    return { refreshToken, accessToken, deviceId: refreshToken.deviceId };
  }

  public async registration(data: NewUserDto, meta: RegistrationMeta) {
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
      if (meta.deviceId)
        await this.tokenService.removeTokensByDeviceId(
          meta.deviceId,
          queryRunner.manager,
        );
      const tokens = await this.createAuthTokens(
        userRecord,
        meta,
        queryRunner.manager,
      );
      await queryRunner.commitTransaction();
      return tokens;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  public async login(data: LoginDto, meta: LoginMeta) {
    const user = await this.userService.findOneByUsername(data.username);
    if (!user) throw new BadRequestException('User is not exist');
    const isPasswordsEqual = await this.encryptionService.compare(
      data.password,
      user.hashPassword,
    );
    if (!isPasswordsEqual) throw new BadRequestException('User is not exist');
    if (meta.deviceId)
      await this.tokenService.removeTokensByDeviceId(meta.deviceId);
    return this.createAuthTokens(user, {
      deviceId: meta.deviceId,
      ip: meta.ip,
      userAgent: meta.userAgent,
    });
  }

  public async verify(args: { accessToken: string }) {
    return this.tokenService.verifyAccessToken(args.accessToken);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private async runCleanUpTokensTask() {
    const result = await this.tokenService.removeTokensByDate(new Date());
    this.logger.log(`Cleared ${result.affected} tokens from db`);
  }
}

export default AuthService;
