import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { filter, map, Observable, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private readonly afAuth: AngularFireAuth,
        private readonly functions: FunctionsApi
    ) {}

    isLoggedIn(): Observable<boolean> {
        return this.afAuth.user.pipe(map((u) => !!u));
    }

    getUser(): Observable<firebase.default.User | null> {
        return this.afAuth.user.pipe();
    }

    private getRoles(): Observable<string[]> {
        return this.getUser().pipe(
            filter((u) => !!u),
            switchMap(() => this.functions.call<Array<string>>('roles'))
        );
    }

    isAdmin(): Observable<boolean> {
        return this.getRoles().pipe(map((roles) => roles.includes('admin')));
    }
}
