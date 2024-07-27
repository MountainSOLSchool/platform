import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { filter, from, map, Observable, switchMap, take } from 'rxjs';
import { UserService } from '@sol/auth/user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly user = inject(UserService).getUser();

    intercept<T>(
        req: HttpRequest<T>,
        next: HttpHandler
    ): Observable<HttpEvent<T>> {
        return this.user.pipe(
            filter(<T>(user: T): user is NonNullable<T> => !!user),
            take(1),
            switchMap((user) => {
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
            })
        );
    }
}
