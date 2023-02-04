import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/Operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthReturnType {
  idToken: string;
  refreshToken: string;
  email: string;
  expiresIn: number;
  localId: string;
  registerd?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  userAuthenticator = new BehaviorSubject<User>(null);
  private expirationDate: any;
  constructor(private http: HttpClient, private router: Router) { }
  onSignup(email: string, password: string) {
    return this.http
      .post<AuthReturnType>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => {
          return this.errorHandler(errorRes);
        }),
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.idToken,
            response.expiresIn,
            response.refreshToken
          );
        })
      );
  }

  onLogin(email: string, password: string) {
    return this.http
      .post<AuthReturnType>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => {
          return this.errorHandler(errorRes);
        }),
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.idToken,
            response.expiresIn,
            response.refreshToken
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    token: string,
    expiresIn: number,
    userId: string
  ) {
    const preparedExpirationDate = new Date(
      new Date().getTime() + +expiresIn * 1000
    );
    const user = new User(email, userId, token, preparedExpirationDate);
    this.userAuthenticator.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'Error occured';
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exist';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Operation failed';
        break;
    }
    return throwError(errorMessage);
  }

  logout() {
    this.userAuthenticator.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.expirationDate) {
      clearTimeout(this.expirationDate);
    }
    this.expirationDate = null;
  }

  autoLogin() {
    const userData: {
      email: string;
      userId: string;
      _token: string;
      expiresIn: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const newUser = new User(
      userData.email,
      userData.userId,
      userData._token,
      new Date(userData.expiresIn)
    );

    if (userData._token) {
      this.userAuthenticator.next(newUser);
      const expireDate = new Date(userData.expiresIn).getTime() - new Date().getTime();
      this.autoLogout(expireDate);
    }
  }

  autoLogout(expirationDate: number) {
    console.log(expirationDate);
    this.expirationDate = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }
}
