import { CryptoPoolerService } from '../../crypto-pooler.interface';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ICoinLoreTicker } from './types';
import { firstValueFrom } from 'rxjs';
import { ICryptoTicker } from '@repo/types/dist/request/crypto/crypto.types';

@Injectable()
class CoinLoreService implements CryptoPoolerService {
  private readonly baseUrl = 'https://api.coinlore.net/api/';
  constructor(private httpService: HttpService) {}
  public async getListOfCrypto(): Promise<ICryptoTicker[]> {
    const request = this.httpService.get<{ data: ICoinLoreTicker[] }>(
      `${this.baseUrl}tickers/?start=0&limit=100`,
      {
        params: { start: 0, limit: 100 },
      },
    );
    return (await firstValueFrom(request)).data.data.map((el) => ({
      name: el.name,
      symbol: el.symbol,
      usdPrice: parseFloat(el.price_usd),
    }));
  }
}

export default CoinLoreService;
