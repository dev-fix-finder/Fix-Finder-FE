import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  authUrl = environment.authUrl;

  constructor(private http: HttpClient) {
  }

  login(data: any) {
    return this.http.post<any>(this.authUrl + 'login', data,
      {observe: 'response' as 'body'})
      .pipe(map(data => {
        return data;
      }));
  }

  signup(data: any) {
    return this.http.post<any>(this.baseUrl + 'users/register', data)
  }

  public verify(
    code: number,
    email: string
  ): Observable<any> {
    return this.http.post(this.baseUrl + 'users/verify?email=' + email + '&code=' + code, {});
  }

  public resend(
    email: string
  ): Observable<any> {
    return this.http.post(this.baseUrl + 'users/resend?email=' + email, {});
  }

  public forgotPasswordSendVerificationCode(
    email: string
  ): Observable<any> {
    return this.http.post(this.baseUrl + 'users/forgot-password-verify?email=' + email, {});
  }

  public verifyReset(
    code: number,
    email: string
  ): Observable<any> {
    return this.http.post(this.baseUrl + 'users/verify-reset?email=' + email + '&code=' + code, {});
  }

  public resetPassword(
    code: number,
    email: string,
    password: string,
  ): Observable<any> {
    return this.http.post(this.baseUrl + 'users/reset-password?email=' + email + '&code=' + code , {
      password: password
    });
  }
}
