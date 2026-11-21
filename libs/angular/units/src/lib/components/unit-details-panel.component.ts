import {
    ChangeDetectionStrategy,
    Component,
    input,
    linkedSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import type { SelectedUnit } from './unit-tree-chart.component';

/**
 * Floats top-right on wide screens and docks to the bottom as a sheet on
 * phones. Collapsing leaves just the title bar so the tree stays visible.
 */
@Component({
    selector: 'sol-unit-details-panel',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule, MatIconModule],
    styles: [
        `
            :host {
                position: fixed;
                z-index: 100;
                left: 0;
                right: 0;
                bottom: 0;
                background: var(--sol-surface, #fff);
                border-radius: 20px 20px 0 0;
                box-shadow: var(
                    --sol-shadow-md,
                    0 -4px 20px rgba(0, 0, 0, 0.15)
                );
            }
            .header {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 0.5rem 0.75rem 1.5rem;
                cursor: pointer;
            }
            h2 {
                flex: 1;
                margin: 0;
                font-size: 1.25rem;
                font-weight: 600;
                color: var(--sol-on-surface, #111);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .expanded h2 {
                white-space: normal;
            }
            p {
                margin: 0;
                padding: 0 1.5rem 1.5rem;
                max-height: calc(50vh - 120px);
                overflow-y: auto;
                line-height: 1.6;
                color: var(--sol-on-surface-variant, #666);
            }
            @media (min-width: 768px) {
                :host {
                    left: auto;
                    right: 20px;
                    bottom: auto;
                    top: 100px;
                    width: 400px;
                    border-radius: 12px;
                }
                .expanded .header {
                    border-bottom: 1px solid var(--sol-disabled-bg, #e5e7eb);
                }
                p {
                    padding-top: 1rem;
                    max-height: 400px;
                }
            }
        `,
    ],
    template: `
        <div [class.expanded]="expanded()">
            <div
                class="header"
                (click)="toggle()"
                (keydown.enter)="toggle()"
                tabindex="-1"
            >
                <h2>{{ unit().name }}</h2>
                <button
                    mat-icon-button
                    type="button"
                    [attr.aria-label]="
                        expanded()
                            ? 'Collapse unit details'
                            : 'Expand unit details'
                    "
                    [attr.aria-expanded]="expanded()"
                    (click)="$event.stopPropagation(); toggle()"
                >
                    <mat-icon>{{
                        expanded() ? 'expand_more' : 'expand_less'
                    }}</mat-icon>
                </button>
            </div>
            @if (expanded()) {
                <p>{{ unit().description }}</p>
            }
        </div>
    `,
})
export class UnitDetailsPanelComponent {
    readonly unit = input.required<SelectedUnit>();

    /** Opens again whenever a different unit is picked. */
    readonly expanded = linkedSignal(() => !!this.unit());

    toggle() {
        this.expanded.update((expanded) => !expanded);
    }
}
