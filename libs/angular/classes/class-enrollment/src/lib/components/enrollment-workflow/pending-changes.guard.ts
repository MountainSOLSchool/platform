import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean;
}

@Injectable({
    providedIn: 'root',
})
export class PendingChangesGuard {
    canDeactivate(
        component: ComponentCanDeactivate
    ): boolean | Observable<boolean> {
        return component.canDeactivate()
            ? true
            : confirm(
                  'Your changes will be lost if you leave this page. Are you sure you want to leave?'
              );
    }
}
