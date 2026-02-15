import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CRYPTO_POOLER_SERVICE } from './crypto-pooler.constants';
import CoinLoreService from './impl/coin-lore/CoinLore.service';

@Module({
  imports: [HttpModule],
  providers: [{ provide: CRYPTO_POOLER_SERVICE, useClass: CoinLoreService }],
  exports: [CRYPTO_POOLER_SERVICE],
})
class CryptoPoolerModule {}

export default CryptoPoolerModule;
