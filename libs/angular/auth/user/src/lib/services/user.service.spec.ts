import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { FIRE_AUTH } from '@sol/angular/firebase/adapter';
import { UserService } from './user.service';

describe('UserService', () => {
    let user$: BehaviorSubject<{ uid: string } | null>;
    const functions = { call: jest.fn() };

    function setup(): UserService {
        TestBed.configureTestingModule({
            providers: [
                { provide: FIRE_AUTH, useValue: { user: () => user$ } },
                { provide: FirebaseFunctionsService, useValue: functions },
            ],
        });
        return TestBed.inject(UserService);
    }

    beforeEach(() => {
        jest.clearAllMocks();
        user$ = new BehaviorSubject<{ uid: string } | null>(null);
        functions.call.mockReturnValue(of(['admin', 'medic_admin']));
    });

    it('emits false for a signed-out user without calling roles', () => {
        const isAdmin: boolean[] = [];
        setup()
            .isAdmin()
            .subscribe((v) => isAdmin.push(v));

        expect(isAdmin).toEqual([false]);
        expect(functions.call).not.toHaveBeenCalled();
    });

    it('resets admin roles to false on sign-in -> sign-out', () => {
        const service = setup();
        const isAdmin: boolean[] = [];
        const isMedicAdmin: boolean[] = [];
        service.isAdmin().subscribe((v) => isAdmin.push(v));
        service.isMedicAdmin().subscribe((v) => isMedicAdmin.push(v));

        user$.next({ uid: 'admin-uid' });
        user$.next(null);

        expect(isAdmin).toEqual([false, true, false]);
        expect(isMedicAdmin).toEqual([false, true, false]);
        expect(functions.call).toHaveBeenCalledWith('roles');
    });

    it('reports a non-admin as such after sign-in', () => {
        functions.call.mockReturnValue(of([]));
        const isAdmin: boolean[] = [];
        setup()
            .isAdmin()
            .subscribe((v) => isAdmin.push(v));

        user$.next({ uid: 'parent-uid' });

        expect(isAdmin).toEqual([false, false]);
    });
});
