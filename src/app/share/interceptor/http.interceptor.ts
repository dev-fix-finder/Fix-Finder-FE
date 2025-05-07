import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {LoadingService} from '../services/loading/loading.service';

export const httpInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = sessionStorage.getItem('token');
  }
  const toastr = inject(ToastrService); // Inject ToastrService
  const loadingService = inject(LoadingService); // Inject ToastrService

  loadingService.mainLoader.next(true);

  if (token) {
    request = request.clone({
      setHeaders: {
        //@ts-ignore
        Authorization: token
      }
    });
  }

  return next(request).pipe(
    catchError(err => {
      let errorMessage = 'Unauthorized'
      if (err.status === 401 || err.status === 403) {
        if (request.url.includes('/api/user/profile')) {
          errorMessage = 'You need to log in to view your profile.';
        }/* else if (request.url.includes('/api/admin/dashboard')) {
          errorMessage = 'Admin access required!';
        }*/

        toastr.error(errorMessage, 'Warning!');
      }
      const error = err.error.message || err.statusText;
      return throwError(() => new Error(error));
    }),
    finalize(() => {
      loadingService.mainLoader.next(false);
    })
  );
};
