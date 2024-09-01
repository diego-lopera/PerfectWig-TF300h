import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(!authService.isLogged()){
    router.navigate(['/']);
    return false;
  }

  if(!authService.isAdmin()){
    router.navigate(['/']);
    return false;
  }

  return true;
};
