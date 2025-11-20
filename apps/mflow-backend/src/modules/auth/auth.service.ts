import { Injectable } from '@nestjs/common';
import UsersService from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
}

export default AuthService;
