import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Dialog } from '@angular/cdk/dialog';
import { of } from 'rxjs';
import { StudentInfoTableComponent } from './student-info-table.component';
import { StudentInfoService } from '../services/student-info.service';
import { StudentInfoDisplayComponent } from '../components/student-info-display.component';
import {
    StudentInfoTableViewComponent,
    StudentTableRow,
} from '../components/student-info-table-view.component';

describe('StudentInfoTableComponent', () => {
    let component: StudentInfoTableComponent;
    let fixture: ComponentFixture<StudentInfoTableComponent>;
    let dialogOpen: jest.Mock;

    const fakeStudents = [
        {
            id: 's1',
            first_name: 'Ada',
            last_name: 'Lovelace',
            birth_date: '2015-06-21',
            school: 'Mountain Elementary',
            student_email: 'ada@example.com',
            student_phone: '555-1000',
            has_life_threatening_allergies: true,
        },
        {
            id: 's2',
            first_name: 'Grace',
            last_name: 'Hopper',
            birth_date: '2013-06-21',
            school: 'Valley Middle',
            primary_email: 'parent@example.com',
            has_life_threatening_allergies: false,
        },
    ];

    beforeEach(async () => {
        dialogOpen = jest.fn();

        await TestBed.configureTestingModule({
            imports: [StudentInfoTableComponent, NoopAnimationsModule],
            providers: [
                {
                    provide: StudentInfoService,
                    useValue: {
                        getAllStudents: () => of({ students: fakeStudents }),
                        getStudentInfoSheet: () => of({ html: '<p>sheet</p>' }),
                    },
                },
                { provide: Dialog, useValue: { open: dialogOpen } },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(StudentInfoTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    const ada: StudentTableRow = {
        id: 's1',
        firstName: 'Ada',
        lastName: 'Lovelace',
        birthDate: '2015-06-21',
        age: 11,
        school: 'Mountain Elementary',
        email: 'ada@example.com',
        phone: '555-1000',
        hasLifeThreateningAllergies: true,
    };

    async function viewStudentAndFlush(student: StudentTableRow) {
        component.viewInfoClick(student);
        fixture.detectChanges();
        await fixture.whenStable();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should map service results into student rows with computed age', () => {
        const rows = component.studentRows.value();
        expect(rows?.length).toBe(2);

        const ada = rows?.find((r) => r.id === 's1');
        expect(ada).toMatchObject({
            firstName: 'Ada',
            lastName: 'Lovelace',
            school: 'Mountain Elementary',
            email: 'ada@example.com',
            phone: '555-1000',
            hasLifeThreateningAllergies: true,
        });

        // birthday is 2015-06-21; current date in env is 2026-06-21 => age 11
        const expectedAge =
            new Date().getFullYear() -
            2015 -
            (isBeforeBirthday('06-21') ? 1 : 0);
        expect(ada?.age).toBe(expectedAge);
    });

    it('should fall back to primary_email when student_email is missing', () => {
        const rows = component.studentRows.value();
        const grace = rows?.find((r) => r.id === 's2');
        expect(grace?.email).toBe('parent@example.com');
    });

    it('should pass the mapped rows down to the table view child', () => {
        const view = fixture.debugElement.children[0];
        expect(view.componentInstance).toBeInstanceOf(
            StudentInfoTableViewComponent
        );
        expect(view.componentInstance.students().length).toBe(2);
    });

    it('should open the info-sheet dialog when a student is viewed', async () => {
        await viewStudentAndFlush(ada);

        expect(dialogOpen).toHaveBeenCalledTimes(1);
        const [openedComponent, config] = dialogOpen.mock.calls[0];
        expect(openedComponent).toBe(StudentInfoDisplayComponent);
        expect(config.data).toMatchObject({
            studentId: 's1',
            studentName: 'Ada Lovelace',
        });
    });

    it('should reset studentBeingViewed after opening the dialog', async () => {
        await viewStudentAndFlush(ada);
        expect(component.studentBeingViewed()).toBeUndefined();
    });
});

function isBeforeBirthday(monthDay: string): boolean {
    const [m, d] = monthDay.split('-').map(Number);
    const now = new Date();
    if (now.getMonth() + 1 < m) return true;
    if (now.getMonth() + 1 === m && now.getDate() < d) return true;
    return false;
}
