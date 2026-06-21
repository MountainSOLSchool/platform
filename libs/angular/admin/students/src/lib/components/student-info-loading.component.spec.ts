import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StudentInfoLoadingComponent } from './student-info-loading.component';

describe('StudentInfoLoadingComponent', () => {
    let component: StudentInfoLoadingComponent;
    let fixture: ComponentFixture<StudentInfoLoadingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StudentInfoLoadingComponent, NoopAnimationsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(StudentInfoLoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the same column headers as the real table', () => {
        const headers = fixture.debugElement.queryAll(
            By.css('th[mat-header-cell]')
        );
        const headerText = headers.map((h) =>
            h.nativeElement.textContent.trim()
        );
        expect(headerText).toContain('Name');
        expect(headerText).toContain('Age');
        expect(headerText).toContain('School');
        expect(headerText).toContain('Contact');
    });

    it('should render five placeholder skeleton rows', () => {
        const rows = fixture.debugElement.queryAll(By.css('tr[mat-row]'));
        expect(rows.length).toBe(5);
    });

    it('should render skeleton placeholders in the rows', () => {
        const skeletons = fixture.debugElement.queryAll(By.css('sol-skeleton'));
        expect(skeletons.length).toBeGreaterThan(0);
    });
});
