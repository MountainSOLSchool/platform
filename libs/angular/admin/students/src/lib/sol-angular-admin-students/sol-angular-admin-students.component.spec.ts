import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { StudentInfoTableComponent } from './student-info-table.component';
import { FIRE_FUNCTIONS } from '@sol/angular/firebase/adapter';

describe('StudentInfoTableComponent', () => {
    let component: StudentInfoTableComponent;
    let fixture: ComponentFixture<StudentInfoTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StudentInfoTableComponent],
            providers: [
                provideHttpClient(),
                { provide: FIRE_FUNCTIONS, useValue: {} },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(StudentInfoTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
