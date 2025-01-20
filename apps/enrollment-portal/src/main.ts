import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
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
import { provideFirebaseApp } from '@angular/fire/app';
import {
    connectFunctionsEmulator,
    getFunctions,
    provideFunctions,
} from '@angular/fire/functions';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
    provideFireAuth,
    provideFireConfig,
    provideFireFunctions,
} from '@sol/angular/firebase/adapter';
import { MarkdownModule } from 'ngx-markdown';
import { getSolApp } from '@sol/ts/firebase/firebase-config';

if (environment.production) {
    enableProdMode();
}

const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, BrowserAnimationsModule),
        importProvidersFrom(BrowserAnimationsModule),
        MessageService,
        provideStoreDevtools({
            maxAge: 50,
        }),
        provideFirebaseApp(getSolApp),
        provideFunctions(() => {
            const functions = getFunctions();
            if (!environment.remoteFunctions) {
                connectFunctionsEmulator(functions, 'localhost', 5001);
            }
            return functions;
        }),
        provideAuth(() => getAuth()),
        provideFireAuth(),
        provideFireFunctions(),
        provideFireConfig(),
        provideHttpClient(withInterceptorsFromDi()),
        httpInterceptorProviders,
        provideStore(),
        provideEffects(),
        provideRouter(appRoutes),
        importProvidersFrom(MarkdownModule.forRoot()),
    ],
});
