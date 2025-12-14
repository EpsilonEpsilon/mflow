import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ConfigService from '../config/config.service';

@Injectable({ providedIn: 'root' })
class BaseApiService {
  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) {}
  private headers = {
    'Content-Type': 'application/json',
  };

  protected post<T>(url: string, body: unknown) {
    return this.http.post(url, body, { headers: this.headers });
  }
}

export default BaseApiService;
