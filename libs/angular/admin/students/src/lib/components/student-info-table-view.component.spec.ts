import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
    StudentInfoTableViewComponent,
    StudentTableRow,
} from './student-info-table-view.component';

function makeRow(overrides: Partial<StudentTableRow> = {}): StudentTableRow {
    return {
        id: 'student-1',
        firstName: 'Ada',
        lastName: 'Lovelace',
        birthDate: '2015-01-01',
        age: 10,
        school: 'Mountain Elementary',
        email: 'ada@example.com',
        phone: '555-1234',
        hasLifeThreateningAllergies: false,
        ...overrides,
    };
}

describe('StudentInfoTableViewComponent', () => {
    let component: StudentInfoTableViewComponent;
    let fixture: ComponentFixture<StudentInfoTableViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StudentInfoTableViewComponent, NoopAnimationsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(StudentInfoTableViewComponent);
        component = fixture.componentInstance;
    });

    function setInputs(
        students: Array<StudentTableRow> | undefined,
        studentIdBeingViewed: string | undefined = undefined
    ) {
        fixture.componentRef.setInput('students', students);
        fixture.componentRef.setInput(
            'studentIdBeingViewed',
            studentIdBeingViewed
        );
        fixture.detectChanges();
    }

    it('should create', () => {
        setInputs([]);
        expect(component).toBeTruthy();
    });

    describe('when students are still loading (undefined)', () => {
        beforeEach(() => {
            setInputs(undefined);
        });

        it('should render the loading placeholder instead of the data table', () => {
            const loading = fixture.debugElement.query(
                By.css('sol-student-info-loading')
            );
            expect(loading).toBeTruthy();
        });

        it('should not show the total students count', () => {
            expect(fixture.nativeElement.textContent).not.toContain(
                'Total Students:'
            );
        });
    });

    describe('when students are loaded', () => {
        beforeEach(() => {
            setInputs([
                makeRow({
                    id: 'a',
                    firstName: 'Ada',
                    lastName: 'Lovelace',
                    age: 10,
                    school: 'Mountain Elementary',
                    email: 'ada@example.com',
                    phone: '555-1234',
                }),
                makeRow({
                    id: 'b',
                    firstName: 'Grace',
                    lastName: 'Hopper',
                    age: 12,
                    school: 'Valley Middle',
                    email: 'grace@example.com',
                    phone: '',
                    hasLifeThreateningAllergies: true,
                }),
            ]);
        });

        it('should render the heading and description', () => {
            const heading = fixture.debugElement.query(By.css('h1'));
            expect(heading.nativeElement.textContent).toContain(
                'Student Information Sheets'
            );
        });

        it('should show the total students count', () => {
            expect(fixture.nativeElement.textContent).toContain(
                'Total Students: 2'
            );
        });

        it('should render one data row per student', () => {
            const rows = fixture.debugElement.queryAll(By.css('tr[mat-row]'));
            expect(rows.length).toBe(2);
        });

        it('should render the name as "Last, First"', () => {
            const text = fixture.nativeElement.textContent;
            expect(text).toContain('Lovelace, Ada');
            expect(text).toContain('Hopper, Grace');
        });

        it('should render age and school for each student', () => {
            const text = fixture.nativeElement.textContent;
            expect(text).toContain('Mountain Elementary');
            expect(text).toContain('Valley Middle');
            expect(text).toContain('10');
            expect(text).toContain('12');
        });

        it('should render contact email and phone when present', () => {
            const text = fixture.nativeElement.textContent;
            expect(text).toContain('ada@example.com');
            expect(text).toContain('555-1234');
        });

        it('should flag students with life-threatening allergies', () => {
            const flags = fixture.debugElement.queryAll(
                By.css('.status-danger')
            );
            expect(flags.length).toBe(1);
            expect(flags[0].nativeElement.textContent).toContain(
                'Life-Threatening Allergies'
            );
        });

        it('should render a view button per student', () => {
            const buttons = fixture.debugElement.queryAll(
                By.css('button.sol-button')
            );
            expect(buttons.length).toBe(2);
            expect(buttons[0].nativeElement.textContent).toContain(
                'View Info Sheet'
            );
        });

        it('should emit viewInfoClick with the student when its view button is clicked', () => {
            const spy = jest.spyOn(component.viewInfoClick, 'emit');
            const firstButton = fixture.debugElement.query(
                By.css('button.sol-button')
            );
            firstButton.nativeElement.click();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(
                expect.objectContaining({ id: 'a', firstName: 'Ada' })
            );
        });

        it('should filter rows via the dataSource filter predicate', () => {
            component.dataSource.filter = 'grace';
            expect(component.dataSource.filteredData.length).toBe(1);
            expect(component.dataSource.filteredData[0].firstName).toBe(
                'Grace'
            );
        });
    });

    describe('when a student info sheet is being viewed', () => {
        beforeEach(() => {
            setInputs([makeRow({ id: 'a' })], 'a');
        });

        it('should disable the view button for the student being viewed', () => {
            const button = fixture.debugElement.query(By.css('#aviewBtn'));
            expect(button.nativeElement.disabled).toBe(true);
        });
    });

    describe('when there are no students', () => {
        beforeEach(() => {
            setInputs([]);
        });

        it('should show the no-data message', () => {
            expect(fixture.nativeElement.textContent).toContain(
                'No students found.'
            );
        });

        it('should report a total of 0 students', () => {
            expect(fixture.nativeElement.textContent).toContain(
                'Total Students: 0'
            );
        });
    });
});
