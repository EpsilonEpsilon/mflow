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
    data: {
      user: User;
      ip?: string;
      userAgent?: string;
    },
    deviceId?: string,
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
      deviceId,
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

  public async registration(
    data: NewUserDto,
    deviceId?: string | null,
    ip?: string,
    userAgent?: string,
  ) {
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
      if (deviceId)
        await this.tokenService.removeTokensByDeviceId(
          deviceId,
          queryRunner.manager,
        );
      const tokens = await this.createAuthTokens(
        {
          user: userRecord,
          ip,
          userAgent,
        },
        deviceId,
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

  public async login(
    data: LoginDto,
    args: {
      id?: string | null;
      ip?: string;
      deviceId?: string;
      userAgent?: string;
    },
  ) {
    const user = await this.userService.findOneByUsername(data.username);
    if (!user) throw new BadRequestException('User is not exist');
    const isPasswordsEqual = await this.encryptionService.compare(
      data.password,
      user.hashPassword,
    );
    if (!isPasswordsEqual) throw new BadRequestException('User is not exist');
    if (args.id) await this.tokenService.removeTokensByDeviceId(args.id);
    return this.createAuthTokens(
      {
        user,
        ip: args.ip,
        userAgent: args.userAgent,
      },
      args.deviceId,
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private async runCleanUpTokensTask() {
    const result = await this.tokenService.removeTokensByDate(new Date());
    this.logger.log(`Cleared ${result.affected} tokens from db`);
  }
}

export default AuthService;
