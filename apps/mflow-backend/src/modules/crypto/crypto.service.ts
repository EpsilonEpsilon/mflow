import { Injectable } from '@nestjs/common';
import CryptoStorageRequestService from '../../common/crypto-storage/crypto-storage-request.service';

@Injectable()
class CryptoService {
  constructor(private readonly cryptoStorage: CryptoStorageRequestService) {}

  public getListOfCryptoCoins() {
    return this.cryptoStorage.getCryptoList();
  }
}

export default CryptoService;
