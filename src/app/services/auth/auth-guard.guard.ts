import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './authservice.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if(authService.isAuthorized()) {
    return true;
  }
  return false;
};
