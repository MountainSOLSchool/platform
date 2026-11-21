import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { RequestState } from '@sol/angular/request';
import type {
    FullUnitsAndPathsResponse,
    GetStudentCompletedUnitsResponse,
} from '@sol/ts/firebase/api-types';
import { StudentUnitsPageComponent } from './student-units-page.component';

const unitsAndPaths: FullUnitsAndPathsResponse = {
    paths: [
        {
            id: 'ranger',
            name: 'Ranger',
            description: '',
            unitIds: ['fire'],
            electives: [],
        },
    ],
    units: {
        fire: {
            id: 'fire',
            name: 'Fire Building',
            description: 'Build a safe fire.',
            category: 'Fire',
            isRepeatable: false,
            prereqUnitIds: [],
        },
    },
};

describe('StudentUnitsPageComponent', () => {
    function setup(
        studentState:
            GetStudentCompletedUnitsResponse | typeof RequestState.Error
    ) {
        const api = {
            getStudentCompletedUnits: jest.fn(() =>
                of(RequestState.Loading, studentState)
            ),
            fullUnitsAndPaths: jest.fn(() => of(unitsAndPaths)),
        };
        TestBed.configureTestingModule({
            providers: [
                { provide: MountainSolApiService, useValue: api },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of(convertToParamMap({ id: 'student-1' })),
                    },
                },
            ],
        });
        const fixture = TestBed.createComponent(StudentUnitsPageComponent);
        fixture.detectChanges();
        return { fixture, api, el: fixture.nativeElement as HTMLElement };
    }

    it('loads the student from the route and draws their tree', async () => {
        const { fixture, api, el } = setup({
            student: { name: 'Robin', completed_units: ['fire'] },
        });
        await fixture.whenStable();
        fixture.detectChanges();

        expect(api.getStudentCompletedUnits).toHaveBeenCalledWith({
            studentId: 'student-1',
        });
        expect(el.querySelector('h1')?.textContent).toContain("Robin's Units");
        expect(el.querySelector('sol-unit-tree-chart svg')).not.toBeNull();
    });

    it('treats a student with no completed units as a fresh start', async () => {
        const { fixture, el } = setup({ student: { name: 'Robin' } });
        await fixture.whenStable();
        fixture.detectChanges();

        expect(el.querySelector('h1')?.textContent).toContain("Robin's Units");
    });

    it('says so when the student cannot be found', async () => {
        const { fixture, el } = setup(RequestState.Error);
        await fixture.whenStable();
        fixture.detectChanges();

        expect(el.textContent).toContain("couldn't find units");
        expect(el.querySelector('h1')).toBeNull();
    });

    it('opens the details panel when a unit is picked', async () => {
        const { fixture, el } = setup({
            student: { name: 'Robin', completed_units: ['fire'] },
        });
        await fixture.whenStable();
        fixture.detectChanges();

        fixture.componentInstance.selectedUnit.set({
            name: 'Fire Building',
            description: 'Build a safe fire.',
        });
        fixture.detectChanges();

        expect(
            el.querySelector('sol-unit-details-panel h2')?.textContent
        ).toContain('Fire Building');
    });
});
