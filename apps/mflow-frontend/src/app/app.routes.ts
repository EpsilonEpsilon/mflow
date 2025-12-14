import { Routes } from '@angular/router';
import HomeComponent from './features/home/home.component';
import LoginComponent from './features/login/login.component';
import AuthGuard from '../guards/authGuard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];
