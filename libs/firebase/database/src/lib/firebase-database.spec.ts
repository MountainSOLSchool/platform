import { firebaseDatabase } from './firebase-database';

describe('firebaseDatabase', () => {
    it('should work', () => {
        expect(firebaseDatabase()).toEqual('firebase-database');
    });
});
