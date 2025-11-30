import { Module } from '@nestjs/common';
import TokenService from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entitites/refresh-token.enetity';
import EncryptionModule from '../encryption/encryption.module';
import UsersModule from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule,
    EncryptionModule,
  ],
  providers: [TokenService],
  exports: [TokenService],
})
class TokenModule {}

export default TokenModule;
