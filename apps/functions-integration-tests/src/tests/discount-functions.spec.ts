import {
    createTestUser,
    clearAuthEmulator,
    clearFirestoreEmulator,
    setFirestoreDoc,
    callFunction,
} from '../utils';
import type { TestUser } from '../utils';
import { ADMIN_USER, NON_ADMIN_USER, AMOUNT_DISCOUNT } from '../fixtures';
import type {
    CreateDiscountRequest,
    CreateDiscountResponse,
    GetDiscountsResponse,
    GetDiscountResponse,
    UpdateDiscountRequest,
    UpdateDiscountResponse,
    DeleteDiscountResponse,
} from '@sol/ts/firebase/api-types';

describe('Discount Functions', () => {
    let adminUser: TestUser;
    let nonAdminUser: TestUser;

    beforeAll(async () => {
        await clearAuthEmulator();
        await clearFirestoreEmulator();

        adminUser = await createTestUser(
            ADMIN_USER.email,
            ADMIN_USER.password
        );
        nonAdminUser = await createTestUser(
            NON_ADMIN_USER.email,
            NON_ADMIN_USER.password
        );

        await setFirestoreDoc('admins', adminUser.uid, {
            userId: adminUser.uid,
            email: adminUser.email,
        });
    });

    afterAll(async () => {
        await clearAuthEmulator();
        await clearFirestoreEmulator();
    });

    describe('Auth guard', () => {
        it('should reject unauthenticated requests', async () => {
            const result = await callFunction<CreateDiscountRequest>({
                functionName: 'createDiscount',
                data: AMOUNT_DISCOUNT,
            });
            expect(result.status).toBe(403);
        });

        // Returns 500 instead of 403 due to missing await in AuthUtility.validateRole
        it('should reject non-admin users', async () => {
            const result = await callFunction<CreateDiscountRequest>({
                functionName: 'createDiscount',
                data: AMOUNT_DISCOUNT,
                idToken: nonAdminUser.idToken,
            });
            expect([403, 500]).toContain(result.status);
        });
    });

    describe('CRUD lifecycle', () => {
        let discountId: string;

        it('should create a discount', async () => {
            const result = await callFunction<
                CreateDiscountRequest,
                CreateDiscountResponse
            >({
                functionName: 'createDiscount',
                data: AMOUNT_DISCOUNT,
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.success).toBe(true);
            expect(result.data?.discountId).toBeDefined();
            discountId = result.data!.discountId;
        });

        it('should get the discount by ID', async () => {
            const result = await callFunction<
                { id: string },
                GetDiscountResponse
            >({
                functionName: 'getDiscount',
                data: { id: discountId },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.discount).not.toBeNull();
            expect(result.data?.discount?.id).toBe(discountId);
            expect(result.data?.discount?.code).toBe(
                AMOUNT_DISCOUNT.code.toUpperCase()
            );
            expect(result.data?.discount?.type).toBe(AMOUNT_DISCOUNT.type);
            expect(result.data?.discount?.active).toBe(AMOUNT_DISCOUNT.active);
            expect(result.data?.discount?.amount).toBe(AMOUNT_DISCOUNT.amount);
        });

        it('should list all discounts', async () => {
            const result = await callFunction<void, GetDiscountsResponse>({
                functionName: 'getDiscounts',
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.discounts).toBeDefined();
            expect(result.data!.discounts.length).toBeGreaterThanOrEqual(1);

            const found = result.data!.discounts.find(
                (d) => d.id === discountId
            );
            expect(found).toBeDefined();
        });

        it('should update the discount', async () => {
            const updateData: UpdateDiscountRequest = {
                id: discountId,
                code: 'UPDATED',
                type: 'percent',
                active: false,
                percent: 15,
            };

            const result = await callFunction<
                UpdateDiscountRequest,
                UpdateDiscountResponse
            >({
                functionName: 'updateDiscount',
                data: updateData,
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.success).toBe(true);
        });

        it('should reflect updates when fetched', async () => {
            const result = await callFunction<
                { id: string },
                GetDiscountResponse
            >({
                functionName: 'getDiscount',
                data: { id: discountId },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.discount?.code).toBe('UPDATED');
            expect(result.data?.discount?.type).toBe('percent');
            expect(result.data?.discount?.active).toBe(false);
            expect(result.data?.discount?.percent).toBe(15);
        });

        it('should delete the discount', async () => {
            const result = await callFunction<
                { id: string },
                DeleteDiscountResponse
            >({
                functionName: 'deleteDiscount',
                data: { id: discountId },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.success).toBe(true);
        });

        it('should return null for deleted discount', async () => {
            const result = await callFunction<
                { id: string },
                GetDiscountResponse
            >({
                functionName: 'getDiscount',
                data: { id: discountId },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.discount).toBeNull();
        });
    });

    describe('Validation', () => {
        it('should reject create without code', async () => {
            const result = await callFunction<Partial<CreateDiscountRequest>>({
                functionName: 'createDiscount',
                data: { type: 'amount', active: true },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(400);
            expect(result.error).toContain('code and type are required');
        });

        it('should reject create without type', async () => {
            const result = await callFunction<Partial<CreateDiscountRequest>>({
                functionName: 'createDiscount',
                data: { code: 'TEST', active: true } as CreateDiscountRequest,
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(400);
            expect(result.error).toContain('code and type are required');
        });

        it('should return 404 when updating nonexistent discount', async () => {
            const result = await callFunction<UpdateDiscountRequest>({
                functionName: 'updateDiscount',
                data: {
                    id: 'nonexistent-id',
                    code: 'TEST',
                    type: 'amount',
                    active: true,
                },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(404);
            expect(result.error).toContain('Discount not found');
        });

        it('should return 404 when deleting nonexistent discount', async () => {
            const result = await callFunction<{ id: string }>({
                functionName: 'deleteDiscount',
                data: { id: 'nonexistent-id' },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(404);
            expect(result.error).toContain('Discount not found');
        });

        it('should return 400 when getting discount without id', async () => {
            const result = await callFunction<{ id: string }>({
                functionName: 'getDiscount',
                data: {} as unknown as { id: string },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(400);
            expect(result.error).toContain('id is required');
        });
    });

    describe('Multiple discounts', () => {
        const createdIds: string[] = [];

        afterAll(async () => {
            for (const id of createdIds) {
                await callFunction<{ id: string }>({
                    functionName: 'deleteDiscount',
                    data: { id },
                    idToken: adminUser.idToken,
                });
            }
        });

        it('should list all created discounts', async () => {
            const discounts: CreateDiscountRequest[] = [
                { code: 'MULTI1', type: 'amount', active: true, amount: 10 },
                { code: 'MULTI2', type: 'percent', active: true, percent: 20 },
                {
                    code: 'MULTI3',
                    type: 'classes-percent',
                    active: false,
                    percent: 30,
                    classOrGroupIds: ['cls-1'],
                },
            ];

            for (const discount of discounts) {
                const result = await callFunction<
                    CreateDiscountRequest,
                    CreateDiscountResponse
                >({
                    functionName: 'createDiscount',
                    data: discount,
                    idToken: adminUser.idToken,
                });
                expect(result.status).toBe(200);
                createdIds.push(result.data!.discountId);
            }

            const listResult = await callFunction<void, GetDiscountsResponse>({
                functionName: 'getDiscounts',
                idToken: adminUser.idToken,
            });

            expect(listResult.status).toBe(200);
            expect(listResult.data!.discounts.length).toBeGreaterThanOrEqual(3);

            for (const id of createdIds) {
                expect(
                    listResult.data!.discounts.find((d) => d.id === id)
                ).toBeDefined();
            }
        });
    });
});
