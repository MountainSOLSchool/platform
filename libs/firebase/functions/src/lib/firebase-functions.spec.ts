import { firebaseFunctions } from './firebase-functions';

describe('firebaseFunctions', () => {
    it('should work', () => {
        expect(firebaseFunctions()).toEqual('firebase-functions');
    });
});
