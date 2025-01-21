import { inject, Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { UserService } from '@sol/auth/user';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminGuard {
    readonly #router = inject(Router);
    readonly #user = inject(UserService);

    canActivate(): Observable<boolean | UrlTree> {
        return this.#user
            .isAdmin()
            .pipe(tap((isAdmin) => !isAdmin && this.#router.navigate(['/'])));
    }
}
