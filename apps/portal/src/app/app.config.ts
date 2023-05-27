import { ApplicationConfig } from '@angular/core';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app-routes';
import { AngularFireModule } from '@angular/fire/compat';
import {
    AngularFireFunctionsModule,
    ORIGIN,
    USE_EMULATOR,
} from '@angular/fire/compat/functions';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
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
        httpInterceptorProviders,
        functionsProvider,
    ],
};
