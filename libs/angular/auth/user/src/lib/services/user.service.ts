import { inject, Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { filter, map, Observable, switchMap } from 'rxjs';
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
        return this.getUser().pipe(
            filter((u) => !!u),
            switchMap(() =>
                this.functions
                    .call<Array<string>>('roles')
                    .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
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
