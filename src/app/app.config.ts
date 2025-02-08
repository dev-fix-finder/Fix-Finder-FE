import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {httpInterceptor} from './share/interceptor/http.interceptor';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideToastr} from 'ngx-toastr';
import {provideNativeDateAdapter} from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes), provideClientHydration(),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideNativeDateAdapter(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      maxOpened: 3,
      autoDismiss: true
    }),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([httpInterceptor])), provideAnimationsAsync(),
  ]
};
