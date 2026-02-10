import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@sol/auth/user';
import { tap } from 'rxjs';

export const medicAdminGuard: CanActivateFn = () => {
    const router = inject(Router);
    const user = inject(UserService);

    return user
        .isMedicAdmin()
        .pipe(tap((isMedicAdmin) => !isMedicAdmin && router.navigate(['/'])));
};
