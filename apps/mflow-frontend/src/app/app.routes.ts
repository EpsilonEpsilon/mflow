import { Routes } from '@angular/router';
import DashboardComponent from './features/dashboard/dashboard.component';
import LoginComponent from './features/login/login.component';
import AuthGuard from '../guards/authGuard';
import SessionValidationHttp from './shared/api/SessionValidation.http';
import PortfolioComponent from './features/portfolio/portfolio.component';
import LayoutComponent from './layout/component/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    providers: [SessionValidationHttp],
    component: LayoutComponent,
    children: [
      { path: 'portfolio', component: PortfolioComponent },
      { path: '', component: DashboardComponent },
    ],
  },

  { path: 'login', component: LoginComponent },
];
