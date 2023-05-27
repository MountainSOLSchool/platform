import { Injectable, NgModule } from '@angular/core';
import {
    AngularFireAuth,
    AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { userLoginInitiated } from './login.actions';

@Injectable({ providedIn: 'root' })
export class UserGuard {
    constructor(
        private readonly router: Router,
        private readonly afAuth: AngularFireAuth,
        private readonly store: Store
    ) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        return this.afAuth.user.pipe(
            map((u) =>
                u
                    ? true
                    : (() => {
                          this.store.dispatch(
                              userLoginInitiated(window.location.pathname)
                          );
                          return this.router.parseUrl('/user/login');
                      })()
            )
        );
    }
}

@NgModule({
    providers: [UserGuard],
    imports: [AngularFireAuthModule],
})
export class UserGuardModule {}
