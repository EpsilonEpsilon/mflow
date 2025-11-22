import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
class EncryptionService {
  constructor(private configService: ConfigService) {}

  public async hash(value: string) {
    const salt = await bcrypt.genSalt(
      this.configService.get<number>('hashing.saltRounds'),
    );
    return bcrypt.hash(value, salt);
  }

  public compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}

export default EncryptionService;
