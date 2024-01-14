import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { loggedin } from '../models/loggedin';
import { LoginModel } from '../models/login-model';
import { TokenModel } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSource = new ReplaySubject<loggedin | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {}
  userProfile = new BehaviorSubject<loggedin | null>(null);
  jwtService: JwtHelperService = new JwtHelperService();

  userLogin(payload: LoginModel) {
    return this.httpClient
      .post('http://localhost:8080/api/auth/signin', payload)
      .pipe(
        map((data) => {
          var token = data as TokenModel;
          var user = data as loggedin;
          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('connecteduser', JSON.stringify(user));

          var userInfo = this.jwtService.decodeToken(token.token!!) as loggedin;

          this.userProfile.next(userInfo);
          if (userInfo.roles && Array.isArray(userInfo.roles)) {
            this.redirectUser(userInfo.roles); // Redirect based on roles
          }
          return true;
        }),
        catchError((error) => {
          console.log(error.error.message);
          const errorMessage = error.error.message || 'An unknown error occurred';
          return throwError(errorMessage);
        })
      );
  }

  getAccessToken(): string {
    var localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      var token = JSON.parse(localStorageToken) as TokenModel;
      var isTokenExpired = this.jwtService.isTokenExpired(token.token!!);
      if (isTokenExpired) {
        this.userProfile.next(null);
        return '';
      }
      var userInfo = this.jwtService.decodeToken(token.token!!) as loggedin;
      this.userProfile.next(userInfo);
      return token.token!!;
    }
    return '';
  }
  isloggedIn() {
    return !!localStorage.getItem('token');
  }
  setConnectedUser(user: loggedin): void {
    localStorage.setItem('connectedUser', JSON.stringify(user));
  }
  getConnectedUser(): loggedin {
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token') as string);
    }
    return {};
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

  isUserInRole(roleFromRoute: string) {
    const connectedUser = this.getConnectedUser();
    const roles = connectedUser.roles;
    return roles && roles.includes(roleFromRoute);
  }

  redirectUser = (roles: string[]) => {
    if (roles.includes('ROLE_ADMIN')) {
      this.router.navigateByUrl('/admin');
    } else if (roles.includes('ROLE_USER')) {
      this.router.navigateByUrl('/');
    } else {
      // Handle other roles or no roles
      // Redirect to a default page or show an error message
    }
  };
}
