import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { PathsPageComponent } from './paths-page.component';

describe('PathsPageComponent', () => {
    let component: PathsPageComponent;
    let fixture: ComponentFixture<PathsPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PathsPageComponent],
            providers: [provideMockStore()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PathsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
