import { Injectable, NgModule } from '@angular/core';
import {
    AngularFireAuth,
    AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly afAuth: AngularFireAuth
    ) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.afAuth.user.pipe(
            map((u) => (u ? true : this.router.parseUrl('/user/login')))
        );
    }
}

@NgModule({
    providers: [UserGuard],
    imports: [AngularFireAuthModule],
})
export class UserGuardModule {}
