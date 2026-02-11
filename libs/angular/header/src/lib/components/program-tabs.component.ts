import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
    selector: 'sol-program-tabs',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterModule],
    styles: [`
        :host { display: flex; }
        .program-tabs { display: flex; padding: 3px; border-radius: 6px; }
        .program-tabs a { padding: 4px 12px; border-radius: 4px; text-decoration: none; font-weight: 500; font-size: 13px; cursor: pointer; }
        :host([variant=toolbar]) .program-tabs { background: rgba(255,255,255,0.15); margin-left: 12px; }
        :host([variant=toolbar]) .program-tabs a { color: rgba(255,255,255,0.7); }
        :host([variant=toolbar]) .program-tabs a.active { background: rgba(255,255,255,0.25); color: #fff; }
        :host([variant=menu]) .program-tabs { background: var(--sol-surface-variant, #f5f5f5); margin: 8px 16px; }
        :host([variant=menu]) .program-tabs a { flex: 1; text-align: center; padding: 6px 12px; color: var(--sol-on-surface-variant, #666); }
        :host([variant=menu]) .program-tabs a.active { background: var(--sol-primary, #006633); color: #fff; }
    `],
    template: `
        <nav class="program-tabs">
            <a routerLink="/classes/enrollment" [class.active]="isYouthActive()">Youth</a>
            <a routerLink="/medic/sign-up" [class.active]="isMedicActive()">Medic</a>
        </nav>`,
    host: { '[attr.variant]': 'variant()' },
})
export class ProgramTabsComponent {
    private readonly router = inject(Router);

    readonly variant = input<'toolbar' | 'menu'>('toolbar');

    private readonly url = toSignal(
        this.router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            map(() => this.router.url),
        ),
        { initialValue: this.router.url }
    );

    readonly isYouthActive = computed(() => !this.url().startsWith('/medic'));
    readonly isMedicActive = computed(() => this.url().startsWith('/medic/sign-up'));
}
