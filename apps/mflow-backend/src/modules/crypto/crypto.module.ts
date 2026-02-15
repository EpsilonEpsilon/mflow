import { Module } from '@nestjs/common';
import CryptoController from './crypto.controller';
import CryptoStorageModule from '../../common/crypto-storage/crypto-storage.module';
import CryptoService from './crypto.service';

@Module({
  imports: [CryptoStorageModule],
  providers: [CryptoService],
  controllers: [CryptoController],
})
class CryptoModule {}

export default CryptoModule;
