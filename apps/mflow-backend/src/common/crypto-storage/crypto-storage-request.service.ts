import { Inject, OnModuleInit } from '@nestjs/common';
import type { CryptoPoolerService } from '../crypto-pooler/crypto-pooler.interface';
import { CRYPTO_POOLER_SERVICE } from '../crypto-pooler/crypto-pooler.constants';
import { ICryptoTicker } from '@repo/types/dist/request/crypto/crypto.types';

class CryptoStorageRequestService implements OnModuleInit {
  private cryptoList: ICryptoTicker[] = [];
  constructor(
    @Inject(CRYPTO_POOLER_SERVICE)
    private cryptoPoolerService: CryptoPoolerService,
  ) {}

  async onModuleInit() {
    this.cryptoList = await this.cryptoPoolerService.getListOfCrypto();
  }

  public getCryptoList() {
    return this.cryptoList;
  }
}

export default CryptoStorageRequestService;
