import { Module } from '@nestjs/common';
import RefreshTokenService from './refresh-token.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entitites/refresh-token.enetity';
import EncryptionModule from '../encryption/encryption.module';
import UsersModule from '../../modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule,
    EncryptionModule,
  ],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
class RefreshTokenModule {}

export default RefreshTokenModule;
