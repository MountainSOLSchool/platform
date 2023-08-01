import { Injectable, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
    AngularFireAuth,
    AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { from } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@NgModule({
    imports: [AngularFireAuthModule, RouterModule],
})
@Injectable()
export class AuthService {
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) {}

    public login(email: string, password: string) {
        return from(this.afAuth.signInWithEmailAndPassword(email, password));
    }

    public emailSignup(email: string, password: string) {
        return from(
            this.afAuth.createUserWithEmailAndPassword(email, password)
        );
    }

    public logout(): void {
        from(this.afAuth.signOut())
            .pipe(
                tap(() => this.router.navigate(['/user/login'])),
                take(1)
            )
            .subscribe();
    }

    public resetPassword(email: string): void {
        from(this.afAuth.sendPasswordResetEmail(email));
    }
}
