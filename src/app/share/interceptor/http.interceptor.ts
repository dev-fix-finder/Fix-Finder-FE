/*
/!*
import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  // Add an authorization token to the request headers
  const authToken = 'Bearer token';
  const authReq = req.clone({ setHeaders: { Authorization: authToken } });

  // Handle the request and return the next handler
  return next(authReq);
};
*!/
import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, finalize, Observable, throwError} from 'rxjs';

// Assume these services are provided via dependency injection in your Angular app
// const loadingService = new LoadingService();
// const snackBarService = new SnackBarService();

export const httpInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  return next(request).pipe(
    catchError(err => {
      if (err.status === 401 || err.status === 403) {
        alert('Unauthorized');
      }
      const error = err.error.message || err.statusText;
      return throwError(() => new Error(error));
    }),
    finalize(() => {

    })
  );
};
*/
// import { AuthService } from './path-to-auth.service';
import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {CookieManagerService} from '../service/cookie-manager/cookie-manager.service'; // Replace with actual path

export const httpInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const cookieManager = inject(CookieManagerService); // Inject the AuthService

  const modifiedRequest = request.clone({
    setHeaders: {
      'X-Tenant-ID': cookieManager.getTenantId(),
      Authorization: cookieManager.getToken()
    }
  });
  console.log(modifiedRequest.headers);
  return next(modifiedRequest).pipe(
    catchError(err => {
      if (err.status === 401 || err.status === 403) {
        alert('Unauthorized');
      }
      const error = err.error.message || err.statusText;
      return throwError(() => new Error(error));
    }),
    finalize(() => {
      console.log('Request finalized');
    })
  );
};
