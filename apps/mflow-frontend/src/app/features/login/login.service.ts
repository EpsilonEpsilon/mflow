import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgFormControl } from '../../../types';
import { NewUserDto } from '@repo/types';
import ValidatorService from '../../core/validator/validator.service';
import { MessageService } from 'primeng/api';
import LoginHttp from './login.http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
class LoginService {
  constructor(
    private validator: ValidatorService,
    private messageService: MessageService,
    private loginHttp: LoginHttp,
    private router: Router,
  ) {}
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

  public async onSubmit(event: Event) {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.messageService.add({
        key: 'global',
        severity: 'error',
        summary: 'Form Error. Please check form fields',
      });
      return;
    }
    const isValid = await this.validator.isValid(
      NewUserDto,
      this.loginForm.value,
    );
    if (!isValid) {
      return this.messageService.add({
        severity: 'error',
        key: 'global',
        summary: 'Form Error. Please check form fields',
      });
    }
    this.loginHttp.loginRequest(this.loginForm.value as NewUserDto).subscribe({
      next: (data: Object) => {
        this.messageService.add({
          severity: 'success',
          key: 'global',
          summary: 'Success',
          detail: 'You have been successfully logged in',
        });
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          key: 'global',
          severity: 'error',
          summary: 'Login is failed',
          detail: err.error.message,
        });
      },
    });
  }
}

export default LoginService;
