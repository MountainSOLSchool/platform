import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Observable, Subject, of } from 'rxjs';
import { StudentInfoDisplayComponent } from './student-info-display.component';
import { StudentInfoService } from '../services/student-info.service';

describe('StudentInfoDisplayComponent', () => {
    let fixture: ComponentFixture<StudentInfoDisplayComponent>;
    let component: StudentInfoDisplayComponent;
    let dialogClose: jest.Mock;

    beforeAll(() => {
        // jsdom does not implement URL.createObjectURL
        (URL as unknown as { createObjectURL: () => string }).createObjectURL =
            () => 'blob:fake';
    });

    function build(infoSheet$: Observable<{ html: string }>): void {
        dialogClose = jest.fn();
        TestBed.configureTestingModule({
            imports: [StudentInfoDisplayComponent, NoopAnimationsModule],
            providers: [
                {
                    provide: DIALOG_DATA,
                    useValue: {
                        studentId: 's1',
                        studentName: 'Ada Lovelace',
                    },
                },
                { provide: DialogRef, useValue: { close: dialogClose } },
                {
                    provide: StudentInfoService,
                    useValue: {
                        getStudentInfoSheet: () => infoSheet$,
                    },
                },
            ],
        });
        fixture = TestBed.createComponent(StudentInfoDisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    async function configure(
        infoSheet$: Observable<{ html: string }>
    ): Promise<void> {
        build(infoSheet$);
        await fixture.whenStable();
        fixture.detectChanges();
    }

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should expose the student name from dialog data', async () => {
        await configure(of({ html: '<p>sheet</p>' }));
        expect(component.studentName).toBe('Ada Lovelace');
    });

    describe('while the info sheet is loading', () => {
        beforeEach(() => {
            // never emits -> resource stays in loading state
            build(new Subject<{ html: string }>());
        });

        it('should show a progress spinner and no iframe', () => {
            const spinner = fixture.debugElement.query(
                By.css('mat-progress-spinner')
            );
            const iframe = fixture.debugElement.query(By.css('iframe'));
            expect(spinner).toBeTruthy();
            expect(iframe).toBeNull();
        });
    });

    describe('once the info sheet has loaded', () => {
        beforeEach(async () => {
            await configure(of({ html: '<p>sheet</p>' }));
        });

        it('should render the iframe and the print button', () => {
            const iframe = fixture.debugElement.query(By.css('iframe'));
            const printButton = fixture.debugElement.query(By.css('button'));
            expect(iframe).toBeTruthy();
            expect(printButton.nativeElement.textContent).toContain('Print');
        });

        it('should close the dialog ref when close() is called', () => {
            component.close();
            expect(dialogClose).toHaveBeenCalledTimes(1);
        });

        it('should create a blob url from html', () => {
            const url = component.createBlobUrl('<p>hi</p>');
            expect(url).toBe('blob:fake');
        });
    });
});
