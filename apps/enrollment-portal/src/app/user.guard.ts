import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { userLoginInitiated } from './login.actions';
import { UserService } from '@sol/auth/user';

export const userGuard: CanActivateFn = () => {
    const router = inject(Router);
    const user = inject(UserService).getUser();
    const store = inject(Store);

    return user.pipe(
        map((user) => !!user),
        tap(
            (isLoggedIn) =>
                !isLoggedIn &&
                store.dispatch(userLoginInitiated(window.location.pathname))
        ),
        map((isLoggedIn) => isLoggedIn || router.parseUrl('/user/login'))
    );
};
