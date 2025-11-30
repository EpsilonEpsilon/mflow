import { Module } from '@nestjs/common';
import UsersModule from '../../common/users/users.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import TokenModule from '../../common/token/token.module';
import EncryptionModule from '../../common/encryption/encryption.module';

@Module({
  imports: [UsersModule, TokenModule, EncryptionModule],
  providers: [AuthService],
  controllers: [AuthController],
})
class AuthModule {}

export default AuthModule;
