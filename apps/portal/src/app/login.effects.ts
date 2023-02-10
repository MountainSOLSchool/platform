import { Injectable, NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { createEffect, provideEffects } from '@ngrx/effects';
import { filter, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginEffect {
    constructor(
        private readonly router: Router,
        private readonly afAuth: AngularFireAuth
    ) {}

    readonly redirectWhenLoggedIn = createEffect(
        () => {
            return this.afAuth.user.pipe(
                filter((user) => !!user),
                filter(
                    () =>
                        window.location.pathname === '/user/login' ||
                        window.location.pathname === '/user/create'
                ),
                tap(() => this.router.navigate(['/']))
            );
        },
        { dispatch: false }
    );
}

@NgModule({
    providers: [provideEffects(LoginEffect)],
})
export class LoginEffectModule {}
