import {
    provideHttpClient,
    withInterceptors,
    withXhr,
} from '@angular/common/http';
import {
    enableProdMode,
    importProvidersFrom,
    provideZoneChangeDetection,
} from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { authInterceptor } from '@sol/auth/interceptor';
import { USE_REMOTE_FUNCTIONS } from '@sol/firebase/functions-api';
import { appRoutes } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
    provideFirebase,
    provideFireAuth,
    provideFireConfig,
    provideFireFunctions,
} from '@sol/angular/firebase/adapter';
import { provideMarkdown } from 'ngx-markdown';
import { getSolApp } from '@sol/ts/firebase/firebase-config';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),
        importProvidersFrom(BrowserModule),
        provideAnimations(),
        provideStoreDevtools({
            maxAge: 50,
        }),
        provideFirebase(getSolApp, {
            authEmulatorUrl: environment.useEmulators
                ? 'http://localhost:9099'
                : undefined,
        }),
        provideFireAuth(),
        provideFireFunctions(),
        provideFireConfig(),
        provideHttpClient(withXhr(), withInterceptors([authInterceptor])),
        provideStore(),
        provideEffects(),
        provideRouter(appRoutes),
        provideMarkdown(),
        {
            provide: USE_REMOTE_FUNCTIONS,
            useValue: environment.remoteFunctions,
        },
    ],
});
