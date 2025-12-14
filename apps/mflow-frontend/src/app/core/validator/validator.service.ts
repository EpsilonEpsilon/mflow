import { Injectable } from '@angular/core';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable({ providedIn: 'root' })
class ValidatorService {
  public async isValid<T>(cls: ClassConstructor<unknown>, data: T) {
    const obj = plainToInstance(cls, data) as object;
    const errors = await validate(obj);
    return !errors.length;
  }
}

export default ValidatorService;
