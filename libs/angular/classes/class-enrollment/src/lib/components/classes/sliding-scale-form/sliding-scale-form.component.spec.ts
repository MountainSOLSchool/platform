import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlidingScaleFormComponent } from './sliding-scale-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SlidingScaleFormComponent', () => {
    let component: SlidingScaleFormComponent;
    let fixture: ComponentFixture<SlidingScaleFormComponent>;

    function setup(
        overrides: {
            paymentRange?: { lowest: number; highest: number };
            initialCost?: number;
        } = {}
    ) {
        fixture.componentRef.setInput(
            'paymentRange',
            overrides.paymentRange ?? { lowest: 50, highest: 150 }
        );
        fixture.componentRef.setInput(
            'initialCost',
            overrides.initialCost ?? 100
        );
        fixture.detectChanges();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SlidingScaleFormComponent, NoopAnimationsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(SlidingScaleFormComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
    });

    it('should default userCost to initialCost', () => {
        setup({ initialCost: 80 });
        expect(component.userCost()).toBe(80);
    });

    it('should render the "Sliding Scale Cost" label', () => {
        setup();
        expect(fixture.nativeElement.textContent).toContain(
            'Sliding Scale Cost'
        );
    });

    it('should update userCost when customCostSelected is called', () => {
        setup({ initialCost: 100 });
        component.customCostSelected(125);
        expect(component.userCost()).toBe(125);
    });

    it('should emit selectedCostChange with the selected cost', () => {
        setup({ initialCost: 100 });
        const spy = jest.spyOn(component.selectedCostChange, 'emit');
        component.customCostSelected(125);
        expect(spy).toHaveBeenCalledWith(125);
    });
});
