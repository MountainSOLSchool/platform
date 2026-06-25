import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectStudentCardComponent } from './select-student-card.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SelectStudentCardComponent', () => {
    let component: SelectStudentCardComponent;
    let fixture: ComponentFixture<SelectStudentCardComponent>;

    function setup(
        overrides: {
            student?: { name: string; birthday: string };
            selected?: boolean;
            disabled?: boolean;
            icon?: string;
            loading?: boolean;
        } = {}
    ) {
        fixture.componentRef.setInput(
            'student',
            'student' in overrides
                ? overrides.student
                : { name: 'Ada Lovelace', birthday: 'Jan 1' }
        );
        fixture.componentRef.setInput('selected', overrides.selected ?? false);
        fixture.componentRef.setInput('disabled', overrides.disabled ?? false);
        fixture.componentRef.setInput('icon', overrides.icon);
        fixture.componentRef.setInput('loading', overrides.loading ?? false);
        fixture.detectChanges();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SelectStudentCardComponent, NoopAnimationsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(SelectStudentCardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
    });

    it('should render the student name', () => {
        setup({ student: { name: 'Ada Lovelace', birthday: 'Jan 1' } });
        expect(fixture.nativeElement.textContent).toContain('Ada Lovelace');
    });

    it('should emit clicked when the action button is clicked', () => {
        setup();
        const spy = jest.spyOn(component.clicked, 'emit');
        const button = fixture.debugElement.query(By.css('button'));
        button.nativeElement.click();
        expect(spy).toHaveBeenCalled();
    });

    it('should show a "Select" button when not selected', () => {
        setup({ selected: false });
        const button = fixture.debugElement.query(By.css('button'));
        expect(button.nativeElement.textContent.trim()).toBe('Select');
    });

    it('should show a "Selected" button when selected', () => {
        setup({ selected: true });
        const button = fixture.debugElement.query(By.css('button'));
        expect(button.nativeElement.textContent.trim()).toBe('Selected');
    });

    it('should disable the button when disabled is true', () => {
        setup({ disabled: true });
        const button = fixture.debugElement.query(By.css('button'));
        expect(button.nativeElement.disabled).toBe(true);
    });

    it('should enable the button when disabled is false', () => {
        setup({ disabled: false });
        const button = fixture.debugElement.query(By.css('button'));
        expect(button.nativeElement.disabled).toBe(false);
    });

    it('should render "New Student" when no student provided', () => {
        setup({ student: undefined });
        expect(fixture.nativeElement.textContent).toContain('New Student');
    });

    it('should map a primeng icon key to a material icon name', () => {
        setup({ icon: 'pi-user-plus' });
        expect(component.matIconName()).toBe('person_add');
    });
});
