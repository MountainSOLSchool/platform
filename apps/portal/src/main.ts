import { ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import {
    AngularFireFunctionsModule,
    ORIGIN,
    USE_EMULATOR,
} from '@angular/fire/compat/functions';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthInterceptor } from '@sol/auth/login';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { appRoutes } from './app/app-routes';
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

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule),
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(ToastModule),
        importProvidersFrom(ClipboardModule),
        importProvidersFrom(RouterModule.forRoot(appRoutes)),
        importProvidersFrom(StoreModule.forRoot({}, {})),
        importProvidersFrom(EffectsModule.forRoot([])),
        importProvidersFrom(
            StoreDevtoolsModule.instrument({
                maxAge: 25, // Retains last 25 states
                autoPause: true,
            })
        ),
        importProvidersFrom(
            AngularFireModule.initializeApp({
                apiKey: 'AIzaSyBxv66X_Ye4MXI5lt8Sjc1xz88rdWJJ0ho',
                authDomain: 'mountain-sol-platform.web.app',
                projectId: 'mountain-sol-platform',
                storageBucket: 'mountain-sol-platform.appspot.com',
                messagingSenderId: '319228048592',
                appId: '1:319228048592:web:2d418795ca948ba2665ad5',
                measurementId: 'G-QN03ENCDDC',
            })
        ),
        importProvidersFrom(AngularFireFunctionsModule),
        importProvidersFrom(HttpClientModule),
        MessageService,
        httpInterceptorProviders,
        functionsProvider,
    ],
});
