import { ICryptoTicker } from '@repo/types/dist/request/crypto/crypto.types';

export interface CryptoPoolerService {
  getListOfCrypto: () => Promise<ICryptoTicker[]>;
}
