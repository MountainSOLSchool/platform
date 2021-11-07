import { Component } from '@angular/core';

@Component({
    selector: 'sol-root',
    template: `<mat-toolbar color="primary">
            <button
                mat-icon-button
                class="example-icon"
                aria-label="Example icon-button with menu icon"
            >
                <mat-icon>menu</mat-icon>
            </button>
            <span>{{ title }}</span>
        </mat-toolbar>
        <router-outlet></router-outlet> `,
    styles: [``],
})
export class AppComponent {
    public title = 'Mountain SOL';
}
