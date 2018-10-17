import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticateService, private router: Router) {
  }
  canActivate(): boolean {
    if (this.auth.isLoginStatus()) {
        return true;
    } else {
         this.router.navigate(['login', {session: 'Session expired'}]);
         localStorage.removeItem('token');
         return false;

    }
  }

}
