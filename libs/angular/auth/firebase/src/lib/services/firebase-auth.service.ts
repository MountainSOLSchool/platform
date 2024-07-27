import { inject, Injectable, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { FIRE_AUTH } from '@sol/ts/firebase/adapter';

@NgModule({
    imports: [RouterModule],
})
@Injectable()
export class FirebaseAuthService {
    private readonly router = inject(Router);
    private readonly fireAuth = inject(FIRE_AUTH);

    public login(email: string, password: string) {
        return from(this.fireAuth.signInWithEmailAndPassword(email, password));
    }

    public emailSignup(email: string, password: string) {
        return from(
            this.fireAuth.createUserWithEmailAndPassword(email, password)
        );
    }

    public logout(): void {
        from(this.fireAuth.signOut())
            .pipe(
                tap(() => this.router.navigate(['/user/login'])),
                take(1)
            )
            .subscribe();
    }

    public resetPassword(email: string): void {
        from(this.fireAuth.sendPasswordResetEmail(email));
    }
}
