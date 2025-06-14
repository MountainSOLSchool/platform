import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolAngularAdminStudentsComponent } from './sol-angular-admin-students.component';

describe('SolAngularAdminStudentsComponent', () => {
    let component: SolAngularAdminStudentsComponent;
    let fixture: ComponentFixture<SolAngularAdminStudentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SolAngularAdminStudentsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SolAngularAdminStudentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
