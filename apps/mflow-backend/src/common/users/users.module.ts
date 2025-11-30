import { Module } from '@nestjs/common';
import UsersService from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitites/user.entitity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
class UsersModule {}

export default UsersModule;
