import { TestBed } from '@angular/core/testing';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { BehaviorSubject, firstValueFrom, isObservable, of } from 'rxjs';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { FIRE_AUTH } from '@sol/angular/firebase/adapter';
import { adminGuard } from './admin.guard';

describe('adminGuard', () => {
    const router = { navigate: jest.fn() };
    const functions = { call: jest.fn() };

    function run(user: { uid: string } | null) {
        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useValue: router },
                {
                    provide: FIRE_AUTH,
                    useValue: { user: () => new BehaviorSubject(user) },
                },
                { provide: FirebaseFunctionsService, useValue: functions },
            ],
        });
        const result = TestBed.runInInjectionContext(() =>
            adminGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
        );
        if (!isObservable(result)) throw new Error('expected an Observable');
        return firstValueFrom(result);
    }

    beforeEach(() => jest.clearAllMocks());

    it('denies and redirects a signed-out user instead of waiting', async () => {
        await expect(run(null)).resolves.toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        expect(functions.call).not.toHaveBeenCalled();
    });

    it('denies and redirects a signed-in non-admin', async () => {
        functions.call.mockReturnValue(of([]));
        await expect(run({ uid: 'parent-uid' })).resolves.toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('allows an admin', async () => {
        functions.call.mockReturnValue(of(['admin']));
        await expect(run({ uid: 'admin-uid' })).resolves.toBe(true);
        expect(router.navigate).not.toHaveBeenCalled();
    });
});
