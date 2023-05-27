import { appConfig } from './app/app.config';

import { AuthInterceptor } from '@sol/auth/interceptor';

import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

const functionsProvider = environment.remoteFunctions
    ? {
          provide: ORIGIN,
          useValue: 'https://mountain-sol-platform.web.app',
      }
    : { provide: USE_EMULATOR, useValue: ['localhost', 5001] };

bootstrapApplication(AppComponent, appConfig);
