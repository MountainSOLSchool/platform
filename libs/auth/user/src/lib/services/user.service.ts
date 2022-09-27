import { Injectable, NgModule } from '@angular/core';
import {
    AngularFireAuth,
    AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';

@NgModule({
    imports: [AngularFireAuthModule],
})
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
