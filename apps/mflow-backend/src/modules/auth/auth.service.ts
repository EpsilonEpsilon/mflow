import { BadRequestException, Injectable } from '@nestjs/common';
import UsersService from '../users/users.service';
import { NewUserDto } from './dto/new-user.dto';
import EncryptionService from '../../common/encryption/encryption.service';
import RefreshTokenService from '../../common/refresh-token/refresh-token.service';

@Injectable()
class AuthService {
  constructor(
    private readonly userService: UsersService,

    private readonly encryptionService: EncryptionService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  public async registration(data: NewUserDto, ip?: string, userAgent?: string) {
    const user = await this.userService.findOneByUsername(data.username);
    if (user) throw new BadRequestException('Username is taken');
    const hashedPassword = await this.encryptionService.hash(data.password);
    const userRecord = await this.userService.createNewUser({
      username: data.username,
      password: hashedPassword,
    });
    return await this.refreshTokenService.create({
      sub: userRecord.id,
      ip: ip,
      userAgent: userAgent,
      username: userRecord.username,
    });
  }
}

export default AuthService;
