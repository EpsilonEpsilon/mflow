import { Module } from '@nestjs/common';
import CryptoPoolerModule from '../crypto-pooler/crypto-pooler.module';
import CryptoStorageRequestService from './crypto-storage-request.service';

@Module({
  imports: [CryptoPoolerModule],
  providers: [CryptoStorageRequestService],
  exports: [CryptoStorageRequestService],
})
class CryptoStorageModule {}

export default CryptoStorageModule;
