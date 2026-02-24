import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassCardComponent, ClassCardInfo } from './class-card.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMarkdown } from 'ngx-markdown';

function makeClassInfo(overrides: Partial<ClassCardInfo> = {}): ClassCardInfo {
    return {
        id: 'test-class-1',
        title: 'Test Class',
        description: 'A test class description',
        pausedForEnrollment: false,
        classDateTimes: 'Jan 1 - Mar 1',
        weekday: 'Monday',
        dailyTimes: '9:00 AM - 12:00 PM',
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
        ...overrides,
    };
}

describe('ClassCardComponent', () => {
    let component: ClassCardComponent;
    let fixture: ComponentFixture<ClassCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ClassCardComponent, NoopAnimationsModule],
            providers: [provideMarkdown()],
        }).compileComponents();

        fixture = TestBed.createComponent(ClassCardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.componentRef.setInput('classInfo', makeClassInfo());
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    describe('when class is full (pausedForEnrollment=true)', () => {
        beforeEach(() => {
            fixture.componentRef.setInput(
                'classInfo',
                makeClassInfo({ pausedForEnrollment: true })
            );
            fixture.detectChanges();
        });

        it('should display the "Full" badge', () => {
            const badge = fixture.debugElement.query(
                By.css('.full-badge')
            );
            expect(badge).toBeTruthy();
            expect(badge.nativeElement.textContent.trim()).toBe('Full');
        });

        it('should show enrollment notice message', () => {
            const notice = fixture.debugElement.query(
                By.css('.enrollment-notice')
            );
            expect(notice).toBeTruthy();
            expect(notice.nativeElement.textContent).toContain(
                'not accepting additional students'
            );
        });

        it('should disable the select button', () => {
            const button = fixture.debugElement.query(
                By.css('.select-button')
            );
            expect(button).toBeTruthy();
            expect(button.nativeElement.disabled).toBe(true);
        });

        it('should show "Class Full" text on the button', () => {
            const button = fixture.debugElement.query(
                By.css('.select-button')
            );
            expect(button.nativeElement.textContent).toContain('Class Full');
        });

        it('should apply grayscale to the header image', () => {
            const header = fixture.debugElement.query(
                By.css('.card-header')
            );
            expect(header.nativeElement.classList).toContain('grayscale');
        });

        it('should not emit selectedChange when trying to select', () => {
            const spy = jest.spyOn(component.selectedChange, 'emit');
            const button = fixture.debugElement.query(
                By.css('.select-button')
            );
            button.nativeElement.click();
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('when class is open (pausedForEnrollment=false)', () => {
        beforeEach(() => {
            fixture.componentRef.setInput(
                'classInfo',
                makeClassInfo({ pausedForEnrollment: false })
            );
            fixture.detectChanges();
        });

        it('should not display the "Full" badge', () => {
            const badge = fixture.debugElement.query(
                By.css('.full-badge')
            );
            expect(badge).toBeNull();
        });

        it('should not show enrollment notice', () => {
            const notice = fixture.debugElement.query(
                By.css('.enrollment-notice')
            );
            expect(notice).toBeNull();
        });

        it('should enable the select button', () => {
            const button = fixture.debugElement.query(
                By.css('.select-button')
            );
            expect(button).toBeTruthy();
            expect(button.nativeElement.disabled).toBe(false);
        });

        it('should show "Select Class" text on the button', () => {
            const button = fixture.debugElement.query(
                By.css('.select-button')
            );
            expect(button.nativeElement.textContent).toContain('Select Class');
        });

        it('should not apply grayscale to the header image', () => {
            const header = fixture.debugElement.query(
                By.css('.card-header')
            );
            expect(header.nativeElement.classList).not.toContain('grayscale');
        });

        it('should emit selectedChange when selecting', () => {
            const spy = jest.spyOn(component.selectedChange, 'emit');
            const button = fixture.debugElement.query(
                By.css('.select-button')
            );
            button.nativeElement.click();
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledWith(
                expect.objectContaining({
                    classSelection: {
                        id: 'test-class-1',
                        semesterId: 'semester-1',
                    },
                    selected: true,
                })
            );
        });
    });

    describe('when class is selected and then deselected', () => {
        beforeEach(() => {
            fixture.componentRef.setInput(
                'classInfo',
                makeClassInfo({ pausedForEnrollment: false })
            );
            component.selected = true;
            fixture.detectChanges();
        });

        it('should show "Selected" state button', () => {
            const button = fixture.debugElement.query(
                By.css('.select-button.selected-state')
            );
            expect(button).toBeTruthy();
            expect(button.nativeElement.textContent).toContain('Selected');
        });

        it('should emit deselection on click', () => {
            const spy = jest.spyOn(component.selectedChange, 'emit');
            const button = fixture.debugElement.query(
                By.css('.select-button.selected-state')
            );
            button.nativeElement.click();
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledWith(
                expect.objectContaining({
                    selected: false,
                })
            );
        });
    });

    describe('when class requires prompt before selecting (sliding scale)', () => {
        beforeEach(() => {
            fixture.componentRef.setInput(
                'classInfo',
                makeClassInfo({
                    pausedForEnrollment: true,
                    paymentRange: { lowest: 50, highest: 150 },
                })
            );
            fixture.detectChanges();
        });

        it('should disable the select button when full', () => {
            const button = fixture.debugElement.query(
                By.css('.select-button')
            );
            expect(button).toBeTruthy();
            expect(button.nativeElement.disabled).toBe(true);
        });
    });

    describe('when class is for information only', () => {
        beforeEach(() => {
            fixture.componentRef.setInput(
                'classInfo',
                makeClassInfo({ forInformationOnly: true })
            );
            fixture.detectChanges();
        });

        it('should show info-only notice instead of select button', () => {
            const infoNotice = fixture.debugElement.query(
                By.css('.info-only-notice')
            );
            expect(infoNotice).toBeTruthy();

            const selectButton = fixture.debugElement.query(
                By.css('.select-button')
            );
            expect(selectButton).toBeNull();
        });
    });
});
