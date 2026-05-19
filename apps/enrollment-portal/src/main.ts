import { provideHttpClient, withInterceptors } from '@angular/common/http';
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
import { MessageService } from 'primeng/api';
import { appRoutes } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideFirebaseApp } from '@angular/fire/app';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
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
        MessageService,
        provideStoreDevtools({
            maxAge: 50,
        }),
        provideFirebaseApp(getSolApp),
        provideFunctions(() => getFunctions()),
        provideAuth(() => getAuth()),
        provideFireAuth(),
        provideFireFunctions(),
        provideFireConfig(),
        provideHttpClient(withInterceptors([authInterceptor])),
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
