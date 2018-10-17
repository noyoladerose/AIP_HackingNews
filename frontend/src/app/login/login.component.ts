import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginMessege = '';
  msgFromRegister: String;
  constructor(private auth: AuthenticateService, private router: Router) {
  }
  ngOnInit() {
  }

  onLogin(userLogin) {
    if (userLogin.invalid) {
      return;
    }

    const email = userLogin.value.email;
    const password = userLogin.value.password;
    const user: User = {
        email: email,
        password: password
    };
    this.auth.loginAuth(user).subscribe(data => {
      // check if login successfully
      if (data.success) {
        this.router.navigate(['news']);
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('email', data.email);

      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        this.loginMessege = err.error.msg;
      }
    });

  }

  MessageFromRegister(Msg: String) {
    this.msgFromRegister = Msg;
  }

}
