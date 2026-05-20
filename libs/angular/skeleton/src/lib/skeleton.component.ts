import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'sol-skeleton',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ``,
    styles: [
        `
            :host {
                display: inline-block;
                background: linear-gradient(
                    90deg,
                    var(--sol-surface-variant, #e0e0e0) 25%,
                    var(--sol-surface, #f5f5f5) 50%,
                    var(--sol-surface-variant, #e0e0e0) 75%
                );
                background-size: 200% 100%;
                animation: sol-skeleton-shimmer 1.5s ease-in-out infinite;
                border-radius: var(--sol-skeleton-radius, 4px);
                height: var(--sol-skeleton-height, 1rem);
                width: var(--sol-skeleton-width, 100%);
            }
            :host([shape='circle']) {
                border-radius: 50%;
            }
            @keyframes sol-skeleton-shimmer {
                0% {
                    background-position: 200% 0;
                }
                100% {
                    background-position: -200% 0;
                }
            }
        `,
    ],
    host: {
        '[attr.shape]': 'shape()',
        '[style.--sol-skeleton-width]': 'width()',
        '[style.--sol-skeleton-height]': 'height()',
        '[style.--sol-skeleton-radius]': 'borderRadius()',
    },
})
export class SkeletonComponent {
    readonly shape = input<'rectangle' | 'circle'>('rectangle');
    readonly width = input<string>('100%');
    readonly height = input<string>('1rem');
    readonly borderRadius = input<string>('4px');
}
