import { of } from 'rxjs';
import type { MountainSolApiService } from '@sol/angular/firebase/api';
import { mockDiscounts, mockDiscountAmount } from '../fixtures';

type MockApiService = {
    [K in keyof MountainSolApiService]: MountainSolApiService[K];
};

export function createMockApiService(
    overrides: Partial<MockApiService> = {}
): Partial<MockApiService> {
    return {
        getDiscounts: (() =>
            of({ discounts: mockDiscounts })) as MockApiService['getDiscounts'],
        getDiscount: (() =>
            of({
                discount: mockDiscountAmount,
            })) as MockApiService['getDiscount'],
        createDiscount: (() =>
            of({
                success: true,
                discountId: 'new-id',
            })) as MockApiService['createDiscount'],
        updateDiscount: (() =>
            of({ success: true })) as MockApiService['updateDiscount'],
        deleteDiscount: (() =>
            of({ success: true })) as MockApiService['deleteDiscount'],
        getEnrollmentMessages: (() =>
            of({ messages: [] })) as MockApiService['getEnrollmentMessages'],
        getEnrollmentMessagesAdmin: (() =>
            of({ messages: [] })) as MockApiService['getEnrollmentMessagesAdmin'],
        updateEnrollmentMessages: (() =>
            of({
                success: true,
            })) as MockApiService['updateEnrollmentMessages'],
        ...overrides,
    };
}
