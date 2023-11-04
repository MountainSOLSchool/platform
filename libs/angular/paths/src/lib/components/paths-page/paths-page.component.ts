import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Path } from '../../models/path';
import { pathsFeature } from '../../store/paths.reducer';

@Component({
    selector: 'sol-paths-page',
    template: `<div class="paths-container">
        <div
            *ngFor="let path of paths$ | async"
            class="path-card"
            [ngStyle]="{ 'background-color': path.color, color: 'white' }"
        >
            <div>{{ path.name }}</div>
        </div>
        <div></div>
    </div>`,
    styles: [
        `
            .paths-container {
                display: flex;
                justify-content: space-between;
            }
            .path-card {
                font-size: 24px;
                border-radius: 1rem;
                width: 20rem;
                height: 10rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `,
    ],
})
export class PathsPageComponent implements OnInit {
    private readonly store = inject(Store);

    public paths$: Observable<Array<Path>> | undefined;

    public ngOnInit() {
        this.paths$ = this.store.select(pathsFeature.selectPaths);
    }
}
