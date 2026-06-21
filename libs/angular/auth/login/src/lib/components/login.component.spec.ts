import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FIRE_AUTH } from '@sol/angular/firebase/adapter';
import { SolToastService } from '@sol/angular/toast';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { LoginComponent } from './login.component';
import { LoginStore } from './login.store';

function queryText(fixture: ComponentFixture<LoginComponent>): string {
    return fixture.nativeElement.textContent as string;
}

describe('LoginComponent', () => {
    let fixture: ComponentFixture<LoginComponent>;
    let component: LoginComponent;

    const fireAuth = {
        signInWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
        createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
        sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
        signOut: jest.fn(() => Promise.resolve()),
        user: jest.fn(() => of(null)),
    };
    const toast = { add: jest.fn() };
    const router = { navigate: jest.fn() };

    beforeEach(async () => {
        jest.clearAllMocks();

        await TestBed.configureTestingModule({
            imports: [LoginComponent, NoopAnimationsModule],
            providers: [
                LoginStore,
                { provide: FIRE_AUTH, useValue: fireAuth },
                { provide: SolToastService, useValue: toast },
                { provide: Router, useValue: router },
                {
                    provide: FirebaseFunctionsService,
                    useValue: { call: jest.fn(() => of([])) },
                },
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { data: {} } },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    function setEmailPassword(email: string, password: string) {
        // The template binds each field with [(ngModel)] and calls
        // onUpdated(login) on change; drive that handler directly so the
        // test is not coupled to ngModel's async writeback timing.
        component.onUpdated({ email, password });
        fixture.detectChanges();
    }

    describe('sign-in mode', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should render the Sign In title', () => {
            const title = fixture.debugElement.query(
                By.css('mat-card-title')
            ).nativeElement;
            expect(title.textContent).toContain('Sign In');
        });

        it('should render email and password fields with labels', () => {
            const labels = fixture.debugElement
                .queryAll(By.css('mat-label'))
                .map((l) => l.nativeElement.textContent.trim());
            expect(labels).toContain('Email');
            expect(labels).toContain('Password');

            expect(
                fixture.debugElement.query(By.css('input[name="email"]'))
            ).toBeTruthy();
            expect(
                fixture.debugElement.query(By.css('input[name="password"]'))
            ).toBeTruthy();
        });

        it('should offer a link to create an account', () => {
            expect(queryText(fixture)).toContain('Create an account');
        });

        it('should call login (not signup) with credentials on submit', () => {
            setEmailPassword('person@email.com', 'secret123');

            const submit = fixture.debugElement
                .queryAll(By.css('button'))
                .find((b) => b.nativeElement.textContent.includes('Sign In'))!;
            submit.nativeElement.click();
            fixture.detectChanges();

            expect(fireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
                'person@email.com',
                'secret123'
            );
            expect(
                fireAuth.createUserWithEmailAndPassword
            ).not.toHaveBeenCalled();
        });

        it('should not call login when the form is empty (invalid)', () => {
            const submit = fixture.debugElement
                .queryAll(By.css('button'))
                .find((b) => b.nativeElement.textContent.includes('Sign In'))!;
            submit.nativeElement.click();
            fixture.detectChanges();

            expect(fireAuth.signInWithEmailAndPassword).not.toHaveBeenCalled();
        });

        it('should surface validation errors after an empty submit', () => {
            const submit = fixture.debugElement
                .queryAll(By.css('button'))
                .find((b) => b.nativeElement.textContent.includes('Sign In'))!;
            submit.nativeElement.click();
            fixture.detectChanges();

            const errors = fixture.debugElement
                .queryAll(By.css('.sol-login-error'))
                .map((e) => e.nativeElement.textContent);
            expect(errors.join(' ')).toContain('Email is required');
            expect(errors.join(' ')).toContain('Password is required');
        });

        it('should submit when Enter is pressed in the password field', () => {
            setEmailPassword('person@email.com', 'secret123');

            const passwordInput = fixture.debugElement.query(
                By.css('input[name="password"]')
            );
            passwordInput.nativeElement.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Enter' })
            );
            fixture.detectChanges();

            expect(fireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
                'person@email.com',
                'secret123'
            );
        });

        it('should offer a password reset suggestion after a failed login', () => {
            fireAuth.signInWithEmailAndPassword.mockReturnValueOnce(
                Promise.reject({ code: 'auth/wrong-password' })
            );
            setEmailPassword('person@email.com', 'badpass');

            const submit = fixture.debugElement
                .queryAll(By.css('button'))
                .find((b) => b.nativeElement.textContent.includes('Sign In'))!;
            submit.nativeElement.click();
            fixture.detectChanges();

            const warn = fixture.debugElement.query(By.css('.sol-login-warn'));
            expect(warn).toBeTruthy();
            expect(warn.nativeElement.textContent).toContain(
                'Send a password reset email'
            );
        });
    });

    describe('create-account mode (standalone)', () => {
        beforeEach(() => {
            component.isCreatingNewAccount = true;
            component.standalone = true;
            fixture.detectChanges();
        });

        it('should render the Create Account title', () => {
            const title = fixture.debugElement.query(
                By.css('mat-card-title')
            ).nativeElement;
            expect(title.textContent).toContain('Create Account');
        });

        it('should offer a "Create With Email" entry before a method is picked', () => {
            expect(queryText(fixture)).toContain('Create With Email');
        });

        it('should reveal the email/password form after choosing email', () => {
            component.createWithEmail();
            fixture.detectChanges();

            expect(
                fixture.debugElement.query(By.css('input[name="email"]'))
            ).toBeTruthy();
            expect(
                fixture.debugElement.query(By.css('input[name="password"]'))
            ).toBeTruthy();
        });

        it('should call signup (not login) with credentials on submit', () => {
            component.createWithEmail();
            fixture.detectChanges();

            setEmailPassword('new@email.com', 'newpass123');

            const submit = fixture.debugElement
                .queryAll(By.css('button'))
                .find((b) =>
                    b.nativeElement.textContent.includes('Create Account')
                )!;
            submit.nativeElement.click();
            fixture.detectChanges();

            expect(
                fireAuth.createUserWithEmailAndPassword
            ).toHaveBeenCalledWith('new@email.com', 'newpass123');
            expect(fireAuth.signInWithEmailAndPassword).not.toHaveBeenCalled();
        });

        it('should toggle back to Sign In via useSignIn()', () => {
            component.useSignIn();
            fixture.detectChanges();

            const title = fixture.debugElement.query(
                By.css('mat-card-title')
            ).nativeElement;
            expect(title.textContent).toContain('Sign In');
        });
    });
});
