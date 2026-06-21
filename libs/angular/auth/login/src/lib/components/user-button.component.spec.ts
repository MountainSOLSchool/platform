import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { UserService } from '@sol/auth/user';
import { FirebaseAuthService } from '@sol/angular/auth/firebase';
import { FIRE_AUTH } from '@sol/angular/firebase/adapter';
import { UserButtonComponent } from './user-button.component';

describe('UserButtonComponent', () => {
    let fixture: ComponentFixture<UserButtonComponent>;
    let component: UserButtonComponent;

    const user$ = new BehaviorSubject<{ email?: string } | null>(null);
    const userService = { getUser: jest.fn(() => user$.asObservable()) };
    const auth = { logout: jest.fn() };

    async function setup() {
        await TestBed.configureTestingModule({
            imports: [UserButtonComponent, NoopAnimationsModule],
            providers: [
                provideRouter([]),
                { provide: UserService, useValue: userService },
                { provide: FIRE_AUTH, useValue: { user: () => of(null) } },
            ],
        })
            .overrideComponent(UserButtonComponent, {
                add: {
                    providers: [
                        { provide: FirebaseAuthService, useValue: auth },
                    ],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(UserButtonComponent);
        component = fixture.componentInstance;
    }

    beforeEach(() => {
        jest.clearAllMocks();
        user$.next(null);
    });

    describe('when signed out', () => {
        beforeEach(async () => {
            await setup();
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should show the register / sign in call to action', () => {
            const link = fixture.debugElement.query(By.css('a'));
            expect(link).toBeTruthy();
            expect(link.nativeElement.textContent).toContain(
                'Register / Sign In'
            );
        });

        it('should show "Account" label in small size', () => {
            fixture.componentRef.setInput('size', 'small');
            fixture.detectChanges();
            const link = fixture.debugElement.query(By.css('a'));
            expect(link.nativeElement.textContent.trim()).toBe('Account');
        });

        it('should not render the account menu trigger', () => {
            expect(fixture.debugElement.query(By.css('sol-avatar'))).toBeNull();
        });
    });

    describe('when signed in', () => {
        beforeEach(async () => {
            await setup();
            user$.next({ email: 'person@email.com' });
            fixture.detectChanges();
        });

        it('should render an avatar for the signed-in user', () => {
            const avatar = fixture.debugElement.query(By.css('sol-avatar'));
            expect(avatar).toBeTruthy();
        });

        it('should not show the register / sign in call to action', () => {
            expect(
                fixture.nativeElement.textContent.includes('Register / Sign In')
            ).toBe(false);
        });

        it('should call auth.logout when signing out', () => {
            component.signOut();
            expect(auth.logout).toHaveBeenCalled();
        });
    });
});
