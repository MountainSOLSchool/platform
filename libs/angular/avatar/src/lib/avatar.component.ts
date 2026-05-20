import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

@Component({
    selector: 'sol-avatar',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (image()) {
            <img [src]="image()" [alt]="label() ?? ''" />
        } @else if (label()) {
            <span class="initials">{{ initials() }}</span>
        }
    `,
    styles: [
        `
            :host {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background: var(--sol-surface-variant, #e0e0e0);
                color: var(--sol-on-surface-variant, #333);
                font-weight: 500;
                overflow: hidden;
                width: var(--sol-avatar-size, 2rem);
                height: var(--sol-avatar-size, 2rem);
                border-radius: var(--sol-avatar-radius, 50%);
                font-size: calc(var(--sol-avatar-size, 2rem) * 0.4);
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .initials {
                line-height: 1;
            }
        `,
    ],
    host: {
        '[style.--sol-avatar-size]': 'size()',
        '[style.--sol-avatar-radius]': 'shape() === "square" ? "4px" : "50%"',
    },
})
export class AvatarComponent {
    readonly label = input<string | null | undefined>();
    readonly image = input<string | null | undefined>();
    readonly shape = input<'circle' | 'square'>('circle');
    readonly size = input<string>('2rem');

    readonly initials = computed(() => {
        const text = this.label();
        if (!text) return '';
        return text
            .split(/\s+/)
            .map((p) => p.charAt(0))
            .join('')
            .slice(0, 2)
            .toUpperCase();
    });
}
