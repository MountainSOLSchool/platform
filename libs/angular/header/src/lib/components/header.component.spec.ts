import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject, of } from 'rxjs';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { FIRE_AUTH } from '@sol/angular/firebase/adapter';
import { HeaderComponent } from './header.component';
import { UserMenuComponent } from './user-menu.component';
import { MobileMenuComponent } from './mobile-menu.component';
import { AdminDrawerNavComponent } from './admin-drawer-nav.component';
import { ProgramTabsComponent } from './program-tabs.component';

@Component({ selector: 'sol-user-menu', template: '' })
class UserMenuStub {}

@Component({ selector: 'sol-mobile-menu', template: '' })
class MobileMenuStub {
    readonly showProgramTabs = input(false);
}

@Component({ selector: 'sol-admin-drawer-nav', template: '' })
class AdminDrawerNavStub {
    readonly isMedicAdmin = input(false);
}

@Component({ selector: 'sol-program-tabs', template: '' })
class ProgramTabsStub {}

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let user$: BehaviorSubject<{ uid: string } | null>;
    const functions = { call: jest.fn(() => of(['admin'])) };

    async function setup(isDesktop: boolean) {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent, NoopAnimationsModule],
            providers: [
                provideRouter([]),
                // Real UserService, so the sign-out path is exercised end to end.
                { provide: FIRE_AUTH, useValue: { user: () => user$ } },
                { provide: FirebaseFunctionsService, useValue: functions },
                {
                    provide: BreakpointObserver,
                    useValue: { observe: () => of({ matches: isDesktop }) },
                },
            ],
        })
            .overrideComponent(HeaderComponent, {
                remove: {
                    imports: [
                        UserMenuComponent,
                        MobileMenuComponent,
                        AdminDrawerNavComponent,
                        ProgramTabsComponent,
                    ],
                },
                add: {
                    imports: [
                        UserMenuStub,
                        MobileMenuStub,
                        AdminDrawerNavStub,
                        ProgramTabsStub,
                    ],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        fixture.detectChanges();
    }

    const adminMenuButton = () =>
        fixture.nativeElement.querySelector(
            'button[aria-label="Toggle admin menu"]'
        );
    const adminDrawer = () =>
        fixture.nativeElement.querySelector('sol-admin-drawer-nav');

    beforeEach(() => {
        jest.clearAllMocks();
        user$ = new BehaviorSubject<{ uid: string } | null>(null);
    });

    describe.each([
        ['desktop', true],
        ['mobile', false],
    ])('on %s', (_, isDesktop) => {
        beforeEach(() => setup(isDesktop));

        it('hides the admin menu while signed out', () => {
            expect(adminMenuButton()).toBeNull();
            expect(adminDrawer()).toBeNull();
        });

        it('removes the admin menu on sign-in -> sign-out', () => {
            user$.next({ uid: 'admin-uid' });
            fixture.detectChanges();
            expect(adminMenuButton()).not.toBeNull();
            expect(adminDrawer()).not.toBeNull();

            user$.next(null);
            fixture.detectChanges();
            expect(adminMenuButton()).toBeNull();
            expect(adminDrawer()).toBeNull();
        });
    });
});
