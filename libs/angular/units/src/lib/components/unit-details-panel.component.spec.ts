import { TestBed } from '@angular/core/testing';
import { UnitDetailsPanelComponent } from './unit-details-panel.component';

describe('UnitDetailsPanelComponent', () => {
    function setup() {
        const fixture = TestBed.createComponent(UnitDetailsPanelComponent);
        fixture.componentRef.setInput('unit', {
            name: 'Fire Building',
            description: 'Build a safe fire.',
        });
        fixture.detectChanges();
        return fixture;
    }

    it('opens showing the selected unit', () => {
        const el: HTMLElement = setup().nativeElement;

        expect(el.querySelector('h2')?.textContent).toContain('Fire Building');
        expect(el.querySelector('p')?.textContent).toContain(
            'Build a safe fire.'
        );
    });

    it('collapses to the title, then reopens when another unit is picked', () => {
        const fixture = setup();
        const el: HTMLElement = fixture.nativeElement;

        el.querySelector('button')?.click();
        fixture.detectChanges();
        expect(el.querySelector('p')).toBeNull();
        expect(el.querySelector('button')?.getAttribute('aria-expanded')).toBe(
            'false'
        );

        fixture.componentRef.setInput('unit', {
            name: 'Knots',
            description: 'Tie a bowline.',
        });
        fixture.detectChanges();
        expect(el.querySelector('p')?.textContent).toContain('Tie a bowline.');
    });
});
