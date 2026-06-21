import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdditionalOptionsFormComponent } from './additional-options-form.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

type Option = { description: string; cost: number; id: string };

function makeOptions(): Array<Option> {
    return [
        { description: 'Lunch', cost: 10, id: 'lunch' },
        { description: 'Field Trip', cost: 25, id: 'trip' },
    ];
}

describe('AdditionalOptionsFormComponent', () => {
    let component: AdditionalOptionsFormComponent;
    let fixture: ComponentFixture<AdditionalOptionsFormComponent>;

    function setup(options: Array<Option> = makeOptions()) {
        fixture.componentRef.setInput('options', options);
        fixture.detectChanges();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdditionalOptionsFormComponent, NoopAnimationsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(AdditionalOptionsFormComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
    });

    it('should render a checkbox per option with label and cost', () => {
        setup();
        const checkboxes = fixture.debugElement.queryAll(
            By.css('mat-checkbox')
        );
        expect(checkboxes.length).toBe(2);
        expect(fixture.nativeElement.textContent).toContain('Lunch ($10)');
        expect(fixture.nativeElement.textContent).toContain('Field Trip ($25)');
    });

    it('should format the label as "<description> ($<cost>)"', () => {
        setup();
        expect(
            component.getLabel({ description: 'Lunch', cost: 10, id: 'lunch' })
        ).toBe('Lunch ($10)');
    });

    it('should add an option id and emit when selected', () => {
        setup();
        const spy = jest.spyOn(component.selectedOptionIdsChange, 'emit');
        component.optionSelected('lunch', true);
        expect(component.selected()).toEqual(['lunch']);
        expect(spy).toHaveBeenCalledWith(['lunch']);
    });

    it('should remove an option id and emit when deselected', () => {
        setup();
        const spy = jest.spyOn(component.selectedOptionIdsChange, 'emit');
        component.optionSelected('lunch', true);
        component.optionSelected('trip', true);
        component.optionSelected('lunch', false);
        expect(component.selected()).toEqual(['trip']);
        expect(spy).toHaveBeenLastCalledWith(['trip']);
    });
});
