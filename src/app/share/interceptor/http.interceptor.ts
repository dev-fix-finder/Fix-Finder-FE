import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {CookieManagerService} from '../services/cookie-manager/cookie-manager.service';

export const httpInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const cookieManager = inject(CookieManagerService); // Inject the AuthService

  const modifiedRequest = request.clone({
    setHeaders: {
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
