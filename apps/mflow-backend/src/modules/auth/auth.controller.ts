import { Controller, Post } from '@nestjs/common';
import UsersService from '../users/users.service';
import { User } from '../users/entitites/user.entitity';

@Controller('auth')
class AuthController {
  constructor(private userService: UsersService) {}

  @Post('/signIn')
  public async signIn(username: User['username'], password: User['password']) {
    const user = await this.userService.findOneByUsername(username);
  }
}

export default AuthController;
