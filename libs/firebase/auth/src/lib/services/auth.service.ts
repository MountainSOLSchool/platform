import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(private afAuth: AngularFireAuth, private router: Router) {}

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
                tap(() => this.router.navigate(['/'])),
                take(1)
            )
            .subscribe();
    }
}
