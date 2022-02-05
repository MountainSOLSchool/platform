import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from '@angular/fire/compat';
import { HeaderModule } from '@sol/header';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReportComponent } from './report.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@sol/auth/login';
import {
    AngularFireFunctionsModule,
    ORIGIN,
    USE_EMULATOR,
} from '@angular/fire/compat/functions';
import { environment } from '../environments/environment';

const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

const functionsProvider = environment.remoteFunctions
    ? {
          provide: ORIGIN,
          useValue: 'https://mountain-sol-platform.web.app',
      }
    : { provide: USE_EMULATOR, useValue: ['localhost', 5001] };

@NgModule({
    declarations: [AppComponent, ReportComponent],
    imports: [
        AngularFireModule.initializeApp({
            apiKey: 'AIzaSyBxv66X_Ye4MXI5lt8Sjc1xz88rdWJJ0ho',
            authDomain: 'mountain-sol-platform.web.app',
            projectId: 'mountain-sol-platform',
            storageBucket: 'mountain-sol-platform.appspot.com',
            messagingSenderId: '319228048592',
            appId: '1:319228048592:web:2d418795ca948ba2665ad5',
            measurementId: 'G-QN03ENCDDC',
        }),
        BrowserModule,
        NoopAnimationsModule,
        AppRoutingModule,
        HeaderModule,
        StoreModule.forRoot({}, {}),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            autoPause: true,
        }),
        EffectsModule.forRoot([]),
        AngularFireFunctionsModule,
        HttpClientModule,
    ],
    providers: [httpInterceptorProviders, functionsProvider],
    bootstrap: [AppComponent],
})
export class AppModule {}
