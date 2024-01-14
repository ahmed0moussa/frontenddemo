import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { LoginModel } from 'src/app/services/models/login-model';

import { AuthService } from 'src/app/services/service/auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent implements OnInit {
  password!: string;
  showPassword: boolean = false;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router,private cd: ChangeDetectorRef) {}

  loginForm: LoginModel = {
    email: '',
    password: '',
  };

  ngOnInit(): void {}

  userLogin() {
    console.log(this.loginForm)
    this.authService.userLogin(this.loginForm).subscribe((data) => {
      this.authService.setConnectedUser;
      if (data) {
        const isAdmin = this.authService.isUserInRole('ROLE_ADMIN');
        if (isAdmin) {
          // Redirect to the admin interface
          this.router.navigateByUrl('/');
        } else {
          // Redirect to the user interface or perform other actions
          this.router.navigateByUrl('/');
        }
      }
    }, (error) => {
      this.errorMessage = error; 
      this.cd.detectChanges();
    }
    );
    
    
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
