import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable, of, map, catchError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FunctionsApi {
    constructor(private readonly http: HttpClient) {}

    public get<T>(resourcePath: string): Observable<T> {
        return of(window.location.hostname).pipe(
            map((hostname) =>
                hostname === 'localhost'
                    ? 'http://localhost:5001/mountain-sol-platform/us-central1'
                    : 'https://us-central1-mountain-sol-platform.cloudfunctions.net'
            ),
            mergeMap((baseUrl) =>
                this.http
                    .get<T>(`${baseUrl}/${resourcePath}`)
                    .pipe(
                        catchError(() =>
                            this.http.get<T>(
                                `https://us-central1-mountain-sol-platform.cloudfunctions.net/${resourcePath}`
                            )
                        )
                    )
            )
        );
    }
}
