import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { environment } from '../../environments/environment';

/* use for hold response data from auth */
interface RespondAuth {
  success: boolean;
  token: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {
  API: String;
  API_REGISTER: String;
  subParam: string;
  constructor(private http: HttpClient, private router: Router) {
    this.API = `${environment.domainURL}` + '/users';
  }
/*
functuon : Login
desc: user log in to the app
*/
  loginAuth(loginUser) {
    this.subParam = '/login';
   return this.http.post<RespondAuth>(`${this.API}${this.subParam}`, loginUser);


  }
   isLoginStatus() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }

/*
functuon : Logout
desc: user log out from the app
*/

  logoutAuth () {
    /* delete all storaged data when user login */
     localStorage.removeItem('token');
     localStorage.removeItem('name');
     localStorage.removeItem('email');

     this.router.navigate(['/listGift']);
  }
/*
functuon : Register
desc: user registration
*/

  registerAuth (userLogin) {
    this.subParam = '/register';

    return this.http.post<User>(`${this.API}${this.subParam}`, userLogin);
  }
/* search a user  */

  searchUser(emailInfo) {
    this.subParam = '/mail';
    return this.http.post<any>(`${this.API}${this.subParam}`, emailInfo);
  }


}
