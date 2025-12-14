import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
class ConfigService {
  public config = {
    api: {
      url: 'https://localhost:3000/api',
    },
  };
}

export default ConfigService;
