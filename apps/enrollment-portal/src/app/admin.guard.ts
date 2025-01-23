import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@sol/auth/user';
import { tap } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);
    const user = inject(UserService);

    return user
        .isAdmin()
        .pipe(tap((isAdmin) => !isAdmin && router.navigate(['/'])));
};
