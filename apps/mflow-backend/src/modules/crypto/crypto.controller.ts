import { Controller, Get } from '@nestjs/common';
import CryptoService from './crypto.service';

@Controller('crypto')
class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}
  @Get('/all')
  getAllCryptos() {
    return this.cryptoService.getListOfCryptoCoins();
  }
}

export default CryptoController;
