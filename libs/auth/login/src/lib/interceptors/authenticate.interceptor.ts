import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';

import { from, map, Observable, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly afAuth: AngularFireAuth) {}

    intercept<T>(
        req: HttpRequest<T>,
        next: HttpHandler
    ): Observable<HttpEvent<T>> {
        return this.afAuth.user.pipe(
            switchMap((user) => {
                if (user) {
                    return from(user.getIdToken()).pipe(
                        map((idToken) =>
                            req.clone({
                                headers: req.headers.append(
                                    'Authorization',
                                    `Bearer ${idToken}`
                                ),
                            })
                        ),
                        switchMap((authorizedReq) => next.handle(authorizedReq))
                    );
                }
                return next.handle(req);
            })
        );
    }
}
