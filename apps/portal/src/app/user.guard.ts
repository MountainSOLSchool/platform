import { inject, Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { userLoginInitiated } from './login.actions';
import { UserService } from '@sol/auth/user';

@Injectable({ providedIn: 'root' })
export class UserGuard {
    private readonly router = inject(Router);
    private readonly user = inject(UserService).getUser();
    private readonly store = inject(Store);

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        return this.user.pipe(
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
})
export class UserGuardModule {}
