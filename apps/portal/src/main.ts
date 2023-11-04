import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { ORIGIN, USE_EMULATOR } from '@angular/fire/compat/functions';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AuthInterceptor } from '@sol/auth/interceptor';
import { MessageService } from 'primeng/api';
import { appRoutes } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
    provideFireAuth,
    provideFireFunctions,
} from '@sol/ts/firebase/adapter';

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

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, BrowserAnimationsModule),
        importProvidersFrom(BrowserAnimationsModule),
        MessageService,
        provideStore(),
        provideEffects(),
        provideRouter(appRoutes),
        provideStoreDevtools({
            maxAge: 50,
        }),
        importProvidersFrom(
            provideFirebaseApp(() =>
                initializeApp({
                    apiKey: 'AIzaSyBxv66X_Ye4MXI5lt8Sjc1xz88rdWJJ0ho',
                    authDomain: 'mountain-sol-platform.web.app',
                    projectId: 'mountain-sol-platform',
                    storageBucket: 'mountain-sol-platform.appspot.com',
                    messagingSenderId: '319228048592',
                    appId: '1:319228048592:web:2d418795ca948ba2665ad5',
                    measurementId: 'G-QN03ENCDDC',
                })
            )
        ),
        importProvidersFrom(provideFunctions(() => getFunctions())),
        importProvidersFrom(provideAuth(() => getAuth())),
        provideFireAuth(),
        provideFireFunctions(),
        importProvidersFrom(HttpClientModule),
        httpInterceptorProviders,
        functionsProvider,
    ],
});
