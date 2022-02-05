import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private readonly afAuth: AngularFireAuth) {}

    isLoggedIn(): Observable<boolean> {
        return this.afAuth.user.pipe(map((u) => !!u));
    }

    getUser(): Observable<firebase.default.User | null> {
        return this.afAuth.user.pipe();
    }
}
