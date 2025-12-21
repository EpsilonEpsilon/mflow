import BaseApiService from '../../core/baseApi/base-api.service';
import { Injectable } from '@angular/core';
import { NewUserDto } from '@repo/types';

@Injectable()
class LoginHttp extends BaseApiService {
  loginRequest(user: NewUserDto) {
    return this.post('auth/login', user);
  }
}

export default LoginHttp;
