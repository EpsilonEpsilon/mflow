import { Routes } from '@angular/router';
import HomeComponent from './features/home/home.component';
import LoginComponent from './features/login/login.component';
import AuthGuard from '../guards/authGuard';
import SessionValidationHttp from './shared/api/SessionValidation.http';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    providers: [SessionValidationHttp],
  },
  { path: 'login', component: LoginComponent },
];
