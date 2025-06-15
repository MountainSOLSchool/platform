import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentInfoTableComponent } from './student-info-table.component';

describe('StudentInfoTableComponent', () => {
    let component: StudentInfoTableComponent;
    let fixture: ComponentFixture<StudentInfoTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StudentInfoTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(StudentInfoTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
