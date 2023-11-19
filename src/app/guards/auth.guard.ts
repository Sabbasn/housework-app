import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const _router : Router = inject(Router)
  const _auth : AuthService = inject(AuthService)
  const _cookie: CookieService = inject(CookieService)
  const token = _cookie.get('token')
  
  if(token == null || !_auth.isTokenValid(token)) {
    _router.navigateByUrl('/login')
    return false
  }

  return true
};
