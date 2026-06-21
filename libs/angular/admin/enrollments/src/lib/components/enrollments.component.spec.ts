import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Dialog } from '@angular/cdk/dialog';
import { of } from 'rxjs';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { SemesterEnrollment } from '@sol/classes/domain';
import { EnrollmentsComponent } from './enrollments.component';

function makeEnrollment(
    overrides: Partial<SemesterEnrollment> = {}
): SemesterEnrollment {
    return {
        id: 'enrollment-1',
        studentName: 'Ada Lovelace',
        studentId: 'student-1',
        finalCost: 100,
        transactionId: 'txn-1',
        timestamp: { _seconds: 1_700_000_000 },
        discounts: [],
        status: 'enrolled',
        classNames: ['Math', 'Science'],
        classes: [{ id: 'class-1', semesterId: 'semester-1' }],
        ...overrides,
    } as SemesterEnrollment;
}

describe('EnrollmentsComponent', () => {
    let component: EnrollmentsComponent;
    let fixture: ComponentFixture<EnrollmentsComponent>;
    let functionsCall: jest.Mock;
    let dialogOpen: jest.Mock;
    let dialogClosed: ReturnType<typeof of>;
    let revokeEnrollment: jest.Mock;

    function setup(enrollments: Array<SemesterEnrollment>) {
        functionsCall = jest.fn().mockReturnValue(of(enrollments));
        dialogClosed = of(undefined);
        dialogOpen = jest.fn().mockReturnValue({
            get closed() {
                return dialogClosed;
            },
        });
        revokeEnrollment = jest.fn().mockReturnValue(of({}));

        TestBed.configureTestingModule({
            imports: [EnrollmentsComponent, NoopAnimationsModule],
            providers: [
                {
                    provide: FirebaseFunctionsService,
                    useValue: { call: functionsCall },
                },
                { provide: Dialog, useValue: { open: dialogOpen } },
                {
                    provide: MountainSolApiService,
                    useValue: { revokeEnrollment },
                },
            ],
        });

        fixture = TestBed.createComponent(EnrollmentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    function rowEls() {
        return fixture.debugElement.queryAll(By.css('tr[mat-row]'));
    }

    it('should create and call adminEnrollments', () => {
        setup([makeEnrollment()]);
        expect(component).toBeTruthy();
        expect(functionsCall).toHaveBeenCalledWith('adminEnrollments');
    });

    it('renders one row per enrollment', () => {
        setup([
            makeEnrollment({ id: 'a', studentName: 'Ada' }),
            makeEnrollment({ id: 'b', studentName: 'Grace' }),
        ]);
        expect(rowEls().length).toBe(2);
    });

    it('renders the student name and joined class names in the Classes column', () => {
        setup([
            makeEnrollment({
                studentName: 'Ada Lovelace',
                classNames: ['Math', 'Science'],
            }),
        ]);
        const text = rowEls()[0].nativeElement.textContent;
        expect(text).toContain('Ada Lovelace');
        expect(text).toContain('Math, Science');
    });

    it('includes the classNamesDisplay (Classes) column in displayedColumns', () => {
        setup([makeEnrollment()]);
        expect(component.displayedColumns()).toContain('classNamesDisplay');

        const headerText = fixture.debugElement.query(
            By.css('tr[mat-header-row]')
        ).nativeElement.textContent;
        expect(headerText).toContain('Classes');
    });

    it('sorts enrollments by timestamp descending', () => {
        setup([
            makeEnrollment({
                id: 'older',
                studentName: 'Older',
                timestamp: { _seconds: 1_000 },
            }),
            makeEnrollment({
                id: 'newer',
                studentName: 'Newer',
                timestamp: { _seconds: 2_000 },
            }),
        ]);
        const rows = rowEls();
        expect(rows[0].nativeElement.textContent).toContain('Newer');
        expect(rows[1].nativeElement.textContent).toContain('Older');
    });

    describe('Revoke & Refund button visibility', () => {
        it('shows the Revoke & Refund button for non-revoked rows', () => {
            setup([makeEnrollment({ status: 'enrolled' })]);
            const button = rowEls()[0].query(
                By.css('button[mat-stroked-button]')
            );
            expect(button).toBeTruthy();
            expect(button.nativeElement.textContent).toContain(
                'Revoke & Refund'
            );
        });

        it('hides the Revoke & Refund button for revoked rows', () => {
            setup([makeEnrollment({ status: 'revoked' })]);
            const button = rowEls()[0].query(
                By.css('button[mat-stroked-button]')
            );
            expect(button).toBeNull();
        });

        it('renders revoked rows with the Revoked status label', () => {
            setup([makeEnrollment({ status: 'revoked' })]);
            expect(rowEls()[0].nativeElement.textContent).toContain('Revoked');
        });
    });

    describe('revoke flow', () => {
        it('opens the dialog when Revoke & Refund is clicked', () => {
            setup([makeEnrollment({ id: 'enrollment-1' })]);
            const button = rowEls()[0].query(
                By.css('button[mat-stroked-button]')
            );
            button.nativeElement.click();
            expect(dialogOpen).toHaveBeenCalledTimes(1);
            const [, config] = dialogOpen.mock.calls[0];
            expect(config.data.enrollmentId).toBe('enrollment-1');
        });

        it('does not call revokeEnrollment when the dialog is cancelled', async () => {
            setup([makeEnrollment()]);
            dialogClosed = of(undefined);
            await component.confirmRevoke(component.dataSource.data[0]);
            expect(revokeEnrollment).not.toHaveBeenCalled();
        });

        it('calls revokeEnrollment with the dialog result when confirmed', async () => {
            setup([makeEnrollment({ id: 'enrollment-1' })]);
            dialogClosed = of({
                classIdsToRevoke: ['class-1'],
                refundAmount: 50,
            });
            await component.confirmRevoke(component.dataSource.data[0]);
            expect(revokeEnrollment).toHaveBeenCalledWith({
                enrollmentId: 'enrollment-1',
                classIdsToRevoke: ['class-1'],
                refundAmount: 50,
            });
        });
    });

    describe('exportToCsv', () => {
        let createObjectURL: jest.Mock;
        let revokeObjectURL: jest.Mock;
        let capturedBlobText: string;

        beforeEach(() => {
            capturedBlobText = '';
            createObjectURL = jest.fn((blob: Blob) => {
                capturedBlobText = (blob as unknown as { __text: string })
                    .__text;
                return 'blob:mock';
            });
            revokeObjectURL = jest.fn();
            (URL as unknown as { createObjectURL: unknown }).createObjectURL =
                createObjectURL;
            (URL as unknown as { revokeObjectURL: unknown }).revokeObjectURL =
                revokeObjectURL;

            const RealBlob = global.Blob;
            jest.spyOn(global, 'Blob').mockImplementation(
                (parts?: BlobPart[]) =>
                    Object.assign(new RealBlob(parts), {
                        __text: (parts ?? []).join(''),
                    }) as unknown as Blob
            );
            jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
                () => undefined
            );
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('builds CSV with a header row and one row per enrollment', () => {
            setup([
                makeEnrollment({
                    studentName: 'Ada Lovelace',
                    classNames: ['Math', 'Science'],
                    finalCost: 120,
                }),
            ]);
            component.exportToCsv();

            expect(createObjectURL).toHaveBeenCalled();
            const lines = capturedBlobText.split('\n');
            expect(lines[0]).toContain('studentName');
            expect(lines[0]).toContain('classNamesDisplay');
            expect(lines[0]).not.toContain('actions');
            expect(capturedBlobText).toContain('Ada Lovelace');
            expect(capturedBlobText).toContain('Math, Science');
            expect(revokeObjectURL).toHaveBeenCalled();
        });

        it('does nothing when there are no rows', () => {
            setup([]);
            component.exportToCsv();
            expect(createObjectURL).not.toHaveBeenCalled();
        });
    });
});
