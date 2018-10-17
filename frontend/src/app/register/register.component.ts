import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   isPasswordMatch = false;
   validateMsg = '';
   registerMessage = '';
  constructor(private auth: AuthenticateService, private router: Router) { }

  ngOnInit() {
  }
  onRegister(userForm) {
    const password = userForm.value.password;
    const confirm = userForm.value.confirm;

    if (password === confirm) {
        this.isPasswordMatch = true;
    } else {
        this.validateMsg = 'Password is not matched';
    }
    if (this.isPasswordMatch) {
      const user: User = {
        name: userForm.value.name,
        email: userForm.value.email,
        password: userForm.value.password
      };

      // call the backend
      this.auth.registerAuth(user).subscribe(data => {
        if (data) {
          this.registerMessage = 'register is done!.';

        }

      },
      err => {
        if (err instanceof HttpErrorResponse) {
          this.validateMsg = err.error.msg;

        }
      }
    );

    }
  }



}
