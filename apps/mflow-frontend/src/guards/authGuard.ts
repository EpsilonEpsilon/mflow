import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return router.createUrlTree(['/login']);
};

export default authGuard;
