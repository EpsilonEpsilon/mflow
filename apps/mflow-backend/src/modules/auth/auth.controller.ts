import { Body, Controller, Ip, Post, Req, Res } from '@nestjs/common';
import { User } from '../users/entitites/user.entitity';
import { NewUserDto } from './dto/new-user.dto';
import AuthService from './auth.service';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signIn')
  public async signIn(username: User['username'], password: User['password']) {
    // const user = await this.userService.findOneByUsername(username);
  }

  @Post('/registration')
  public async registration(
    @Body() body: NewUserDto,
    @Req() req: Request,
    @Ip() ip: string,
  ) {
    const userAgent = req.headers['user-agent'];
    return this.authService.registration(body, ip, userAgent);
  }
}

export default AuthController;
