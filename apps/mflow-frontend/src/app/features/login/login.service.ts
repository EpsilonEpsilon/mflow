import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgFormControl } from '../../../types';
import { NewUserDto } from '@repo/types';
import ValidatorService from '../../core/validator/validator.service';

@Injectable()
class LoginService {
  constructor(private validator: ValidatorService) {}
  loginForm = new FormGroup<NgFormControl<NewUserDto>>({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(3),
    ]),
  });

  public async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const isValid = await this.validator.isValid(
      NewUserDto,
      this.loginForm.value,
    );
  }
}

export default LoginService;
