import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import LoginService from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.template.html',
  providers: [LoginService],
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
  ],
})
class LoginComponent {
  constructor(protected loginService: LoginService) {}
}

export default LoginComponent;
