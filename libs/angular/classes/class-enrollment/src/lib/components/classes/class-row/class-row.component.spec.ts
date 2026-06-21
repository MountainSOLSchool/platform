import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassRowComponent } from './class-row.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMarkdown } from 'ngx-markdown';

type RowClass = {
    id: string;
    title: string;
    description: string;
    pausedForEnrollment: boolean;
    classDateTimes: string;
    weekday: string;
    dailyTimes: string;
    classType: string;
    gradeRangeStart: number;
    gradeRangeEnd: number;
    location: string;
    paymentRange?: { lowest: number; highest: number };
    cost: number;
    instructors: Array<{ firstName: string; lastName: string }>;
    semesterId: string;
    forInformationOnly: boolean;
    initialCost: number;
    additionalCost: number;
    additionalOptions?: Array<{
        description: string;
        cost: number;
        id: string;
    }>;
    selected: boolean;
};

function makeClass(overrides: Partial<RowClass> = {}): RowClass {
    return {
        id: 'class-1',
        title: 'Morning Class',
        description: 'desc',
        pausedForEnrollment: false,
        classDateTimes: 'Jan 1 - Mar 1',
        weekday: 'Monday',
        dailyTimes: '9-12',
        classType: 'Standard',
        gradeRangeStart: 1,
        gradeRangeEnd: 5,
        location: 'Room A',
        cost: 100,
        instructors: [{ firstName: 'Jane', lastName: 'Doe' }],
        semesterId: 'semester-1',
        forInformationOnly: false,
        initialCost: 100,
        additionalCost: 0,
        selected: false,
        ...overrides,
    };
}

interface TestRow {
    classes: Array<RowClass>;
    group?: { id: string; name: string; cost: number };
    start: Date;
    index: number;
    selected: boolean;
}

function makeRow(overrides: Partial<TestRow> = {}): TestRow {
    return {
        classes: [makeClass()],
        start: new Date('2026-01-01'),
        index: 0,
        selected: false,
        ...overrides,
    };
}

describe('ClassRowComponent', () => {
    let component: ClassRowComponent;
    let fixture: ComponentFixture<ClassRowComponent>;

    function setup(row: TestRow = makeRow()) {
        fixture.componentRef.setInput('row', row);
        fixture.detectChanges();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ClassRowComponent, NoopAnimationsModule],
            providers: [provideMarkdown()],
        }).compileComponents();

        fixture = TestBed.createComponent(ClassRowComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
    });

    it('should render a class card per class in the row', () => {
        setup(
            makeRow({
                group: { id: 'g1', name: 'Full Day', cost: 150 },
                classes: [
                    makeClass({ id: 'class-1', title: 'Morning Class' }),
                    makeClass({ id: 'class-2', title: 'Afternoon Class' }),
                ],
            })
        );
        const cards = fixture.debugElement.queryAll(By.css('sol-class-card'));
        expect(cards.length).toBe(2);
    });

    describe('grouped (full-day) row', () => {
        it('should render the group name and a select-all button', () => {
            setup(
                makeRow({
                    group: { id: 'g1', name: 'Full Day Adventure', cost: 150 },
                    classes: [
                        makeClass({ id: 'class-1', cost: 100 }),
                        makeClass({ id: 'class-2', cost: 100 }),
                    ],
                })
            );
            expect(fixture.nativeElement.textContent).toContain(
                'Full Day Adventure'
            );
            const button = fixture.debugElement.query(
                By.css('.select-all-button')
            );
            expect(button).toBeTruthy();
            expect(button.nativeElement.textContent).toContain(
                'Select Full Day'
            );
        });

        it('should show the all-day discount badge when there are savings', () => {
            setup(
                makeRow({
                    group: { id: 'g1', name: 'Full Day', cost: 150 },
                    classes: [
                        makeClass({ id: 'class-1', cost: 100 }),
                        makeClass({ id: 'class-2', cost: 100 }),
                    ],
                })
            );
            const badge = fixture.debugElement.query(By.css('.discount-badge'));
            expect(badge).toBeTruthy();
            expect(badge.nativeElement.textContent).toContain('discount');
        });

        it('should disable the select-all button when a class is full', () => {
            setup(
                makeRow({
                    group: { id: 'g1', name: 'Full Day', cost: 150 },
                    classes: [
                        makeClass({ id: 'class-1' }),
                        makeClass({
                            id: 'class-2',
                            pausedForEnrollment: true,
                        }),
                    ],
                })
            );
            const button = fixture.debugElement.query(
                By.css('.select-all-button')
            );
            expect(button.nativeElement.disabled).toBe(true);
            expect(button.nativeElement.textContent).toContain(
                'One or more classes are full'
            );
        });

        it('should emit classSelection for every class when selecting the full day', () => {
            setup(
                makeRow({
                    group: { id: 'g1', name: 'Full Day', cost: 150 },
                    classes: [
                        makeClass({ id: 'class-1' }),
                        makeClass({ id: 'class-2' }),
                    ],
                })
            );
            const spy = jest.spyOn(component.classSelection, 'emit');
            const button = fixture.debugElement.query(
                By.css('.select-all-button')
            );
            button.nativeElement.click();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith(
                expect.objectContaining({
                    classSelection: {
                        id: 'class-1',
                        semesterId: 'semester-1',
                    },
                    selected: true,
                })
            );
        });

        it('should emit deselection for every class when the row is already selected', () => {
            setup(
                makeRow({
                    selected: true,
                    group: { id: 'g1', name: 'Full Day', cost: 150 },
                    classes: [
                        makeClass({ id: 'class-1', selected: true }),
                        makeClass({ id: 'class-2', selected: true }),
                    ],
                })
            );
            const button = fixture.debugElement.query(
                By.css('.select-all-button.selected')
            );
            expect(button.nativeElement.textContent).toContain(
                'Selected Full Day'
            );
            const spy = jest.spyOn(component.classSelection, 'emit');
            button.nativeElement.click();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith(
                expect.objectContaining({ selected: false })
            );
        });
    });

    describe('selectionChanged', () => {
        it('should forward the event through the classSelection output', () => {
            setup();
            const spy = jest.spyOn(component.classSelection, 'emit');
            const event = {
                classSelection: { id: 'class-1', semesterId: 'semester-1' },
                selected: true,
                userCost: 120,
            };
            component.selectionChanged(event);
            expect(spy).toHaveBeenCalledWith(event);
        });
    });

    describe('locked state', () => {
        it('should report the row as locked when all classes are locked', () => {
            setup(
                makeRow({
                    classes: [
                        makeClass({ id: 'class-1' }),
                        makeClass({ id: 'class-2' }),
                    ],
                })
            );
            fixture.componentRef.setInput('lockedClassIds', [
                'class-1',
                'class-2',
            ]);
            fixture.detectChanges();
            expect(component.isRowLocked()).toBe(true);
        });

        it('should not report the row as locked when only some classes are locked', () => {
            setup(
                makeRow({
                    classes: [
                        makeClass({ id: 'class-1' }),
                        makeClass({ id: 'class-2' }),
                    ],
                })
            );
            fixture.componentRef.setInput('lockedClassIds', ['class-1']);
            fixture.detectChanges();
            expect(component.isRowLocked()).toBe(false);
        });
    });

    describe('savings', () => {
        it('should compute savings as combined class cost minus group cost', () => {
            setup(
                makeRow({
                    group: { id: 'g1', name: 'Full Day', cost: 150 },
                    classes: [
                        makeClass({ id: 'class-1', cost: 100 }),
                        makeClass({ id: 'class-2', cost: 100 }),
                    ],
                })
            );
            expect(component.getClassRowSavings()).toBe(50);
        });
    });
});
