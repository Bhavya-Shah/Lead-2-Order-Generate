import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';

import { User } from '../models/user.model';

interface AuthResponseData {
  access_token: string;
  token_type: string;
  expires_in: string;
}

class UserEntity {
  constructor(
    public Username: string,
    public Email: string,
    public Password: string
  ) {}
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, email: string, password: string) {
    const userEntity = new UserEntity(
      username,
      email,
      password
    );
    console.log(userEntity);
    return this.http.post(
      // http://localhost:52778
      'http://192.168.2.3:6969/api/auth',
      userEntity,
      )
      .pipe(
        catchError(httpErrorResponse => {
          const errorMessage = 'An unknown error occured';
          if (!(httpErrorResponse.error && httpErrorResponse.error.Message)) {
            return throwError(errorMessage);
          }
          // console.log(JSON.parse(httpErrorResponse.error.Message));
          return throwError(JSON.parse(httpErrorResponse.error.Message));
        })
      );
  }

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');
    // console.log(body.get('grant_type'));
    return this.http
      // http://localhost:52778
      .post<AuthResponseData>('http://192.168.2.3:6969/token', body.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .pipe(
        tap((resData: AuthResponseData) => {
          const expireDate = new Date(
            new Date().getTime() + +resData.expires_in * 1000
          );
          // console.log(expireDate);
          const user = new User(
            username,
            resData.access_token,
            resData.token_type,
            expireDate
          );
          this.user.next(user);
          this.autoLogout(+resData.expires_in * 1000);
          // this.autoLogout(3000);
          // console.log(user.expire_date);
          localStorage.setItem('userData', JSON.stringify(user));
        }),
        catchError(this.handleError)
      );
  }

  autoLogin() {
    const userData: {
      username: string;
      access_token: string;
      token_type: string;
      expire_date: string;
    } = JSON.parse(localStorage.getItem('userData'));
    // console.log(userData.expire_date);
    if (!userData) {
      return;
    }
    // console.log(new Date(userData.expire_date));
    const loadedUser = new User(
      userData.username,
      userData.access_token,
      userData.token_type,
      new Date(userData.expire_date)
    );
    console.log(loadedUser);
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData.expire_date).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      // this.router.navigate(['/']);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    // this.router.navigate(['auth/login']);
  }

  autoLogout(expirationDuration: number) {
    // console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    const errorMessage = 'An unknown error occured';
    console.log(errorRes);
    if (!errorRes.error || !errorRes.error.error_description) {
      return throwError(errorMessage);
    }
    return throwError(errorRes.error.error_description);
  }

  getPassword(email){
    // http://localhost:52778
    return this.http.get('http://192.168.2.3:6969/api/auth', {
      params: new HttpParams().set('email', email)
    });
  }
}
