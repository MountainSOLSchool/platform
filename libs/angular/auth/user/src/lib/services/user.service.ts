import { inject, Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { map, Observable, of, switchMap } from 'rxjs';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { FIRE_AUTH } from '@sol/angular/firebase/adapter';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly functions = inject(FirebaseFunctionsService);
    private readonly user = inject(FIRE_AUTH).user();

    isLoggedIn(): Observable<boolean> {
        return this.user.pipe(map((u) => !!u));
    }

    getUser() {
        return this.user.pipe();
    }

    private getRoles(): Observable<string[]> {
        // Signed out must emit [] (not be filtered) so role-gated UI resets.
        return this.getUser().pipe(
            switchMap((u) =>
                u
                    ? this.functions
                          .call<Array<string>>('roles')
                          .pipe(
                              RequestedOperatorsUtility.ignoreAllStatesButLoaded()
                          )
                    : of([])
            )
        );
    }

    isAdmin(): Observable<boolean> {
        return this.getRoles().pipe(map((roles) => roles.includes('admin')));
    }

    isMedicAdmin(): Observable<boolean> {
        return this.getRoles().pipe(
            map((roles) => roles.includes('medic_admin'))
        );
    }
}
