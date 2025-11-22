import { Module } from '@nestjs/common';
import UsersModule from '../users/users.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import RefreshTokenModule from '../../common/refresh-token/refresh-token.module';
import EncryptionModule from '../../common/encryption/encryption.module';

@Module({
  imports: [UsersModule, RefreshTokenModule, EncryptionModule],
  providers: [AuthService],
  controllers: [AuthController],
})
class AuthModule {}

export default AuthModule;
