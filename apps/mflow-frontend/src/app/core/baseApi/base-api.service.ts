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
    return this.http.post(this.buildUrl(url), body, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  private buildUrl(url: string) {
    return new URL(url, this.config.config.api.url).toString();
  }
}

export default BaseApiService;
