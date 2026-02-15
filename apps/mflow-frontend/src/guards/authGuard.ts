import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import SessionValidationHttp from '../app/shared/api/SessionValidation.http';
import { catchError, map, of } from 'rxjs';

const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const sessionValidation = inject(SessionValidationHttp);
  console.log('GUARD');
  return sessionValidation.validateToken().pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['/login']))),
  );
};

export default authGuard;
