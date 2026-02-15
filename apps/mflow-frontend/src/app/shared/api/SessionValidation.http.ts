import BaseApiService from '../../core/baseApi/base-api.service';
import { Injectable } from '@angular/core';

@Injectable()
class SessionValidationHttp extends BaseApiService {
  validateToken() {
    return this.post('auth/verify');
  }
}

export default SessionValidationHttp;
