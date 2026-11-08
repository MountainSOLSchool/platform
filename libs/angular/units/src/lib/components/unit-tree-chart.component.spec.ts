import { TestBed } from '@angular/core/testing';
import type { UnitTreeNode } from '../utilities/student-unit-tree';
import {
    type SelectedUnit,
    UnitTreeChartComponent,
} from './unit-tree-chart.component';

const tree: UnitTreeNode = {
    name: 'Robin',
    status: 'unlocked',
    children: [
        {
            name: 'Ranger',
            status: 'partial',
            children: [
                {
                    name: 'Fire',
                    status: 'partial',
                    children: [
                        {
                            name: 'Fire Building',
                            description: 'Build a safe fire.',
                            status: 'complete',
                        },
                        {
                            name: 'Cooking',
                            description: 'Cook over coals.',
                            status: 'unlocked',
                        },
                    ],
                },
            ],
        },
        {
            name: 'Naturalist',
            status: 'locked',
            children: [
                {
                    name: 'Birds',
                    status: 'locked',
                    children: [
                        {
                            name: 'Birdsong',
                            description: 'Learn five songs.',
                            status: 'locked',
                        },
                    ],
                },
            ],
        },
    ],
};

describe('UnitTreeChartComponent', () => {
    function setup() {
        const fixture = TestBed.createComponent(UnitTreeChartComponent);
        fixture.componentRef.setInput('tree', tree);
        fixture.detectChanges();
        const el: HTMLElement = fixture.nativeElement;
        const node = (name: string) =>
            [...el.querySelectorAll<SVGGElement>('.node')].find(
                (g) => g.querySelector('text')?.textContent === name
            );
        return { fixture, el, node };
    }

    it('draws started paths open and locked paths collapsed', () => {
        const { node } = setup();

        expect(node('Fire Building')?.classList).toContain('complete');
        expect(node('Cooking')?.classList).toContain('unlocked');
        expect(node('Naturalist')?.classList).toContain('locked');
        expect(node('Birds')).toBeUndefined();
    });

    it('expands a locked path when it is clicked', () => {
        const { node } = setup();

        node('Naturalist')?.dispatchEvent(new MouseEvent('click'));

        expect(node('Birds')).toBeDefined();
    });

    it('emits the unit and marks it selected when a unit is clicked', () => {
        const { fixture, node } = setup();
        const selected: Array<SelectedUnit> = [];
        fixture.componentInstance.unitSelect.subscribe((u) => selected.push(u));

        node('Cooking')?.dispatchEvent(new MouseEvent('click'));

        expect(selected).toEqual([
            { name: 'Cooking', description: 'Cook over coals.' },
        ]);
        expect(node('Cooking')?.classList).toContain('selected');
    });

    it('does not emit for path or category nodes', () => {
        const { fixture, node } = setup();
        const selected: Array<SelectedUnit> = [];
        fixture.componentInstance.unitSelect.subscribe((u) => selected.push(u));

        node('Fire')?.dispatchEvent(new MouseEvent('click'));

        expect(selected).toEqual([]);
    });

    it('keeps the SVG inside its own element', () => {
        const { el } = setup();
        const outside = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
        );
        document.body.appendChild(outside);

        setup();

        expect(el.querySelectorAll('svg')).toHaveLength(1);
        expect(document.body.contains(outside)).toBe(true);
    });
});
