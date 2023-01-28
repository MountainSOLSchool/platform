import { inject, Injectable } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { map, of, tap } from 'rxjs';

type ServerClass = {
    title: string;
    startMs: number;
    endMs: number;
    id: string;
    classType: string;
    gradeRangeStart: number;
    gradeRangeEnd: number;
    description: string;
    cost: number;
    location: string;
    instructors: Array<{
        first_name: string;
        last_name: string;
    }>;
    dailyTimes: string;
    weekday: string;
    thumbnailUrl: string;
};

type ServerClassGroup = {
    name: string;
    classIds: Array<string>;
    cost: number;
};

@Injectable({ providedIn: 'root' })
export class ClassListService {
    private readonly functionsApi = inject(FunctionsApi);
    private _cachedFutureClasses: Array<ServerClass> | undefined;

    getFutureClasses() {
        return this._cachedFutureClasses
            ? of(this._cachedFutureClasses)
            : this.functionsApi
                  .call<{
                      classes: Array<ServerClass>;
                  }>('classes')
                  .pipe(
                      map((response) =>
                          response.classes.filter((c) => c.startMs > Date.now())
                      ),
                      tap((classes) => (this._cachedFutureClasses = classes))
                  );
    }

    getClassGroups() {
        return this._cachedFutureClasses
            ? of(this._cachedFutureClasses)
            : this.functionsApi
                  .call<{
                      classes: Array<ServerClass>;
                  }>('classes')
                  .pipe(
                      map((response) =>
                          response.classes.filter((c) => c.startMs > Date.now())
                      ),
                      tap((classes) => (this._cachedFutureClasses = classes))
                  );
    }
}
