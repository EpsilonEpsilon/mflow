import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import LoginService from './login.service';
import { ToastModule } from 'primeng/toast';
import LoginHttp from './login.http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.template.html',
  providers: [LoginService, LoginHttp],
  styleUrls: ['./login.scss'],
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    ReactiveFormsModule,
    ToastModule,
  ],
})
class LoginComponent {
  constructor(protected loginService: LoginService) {}
}

export default LoginComponent;
