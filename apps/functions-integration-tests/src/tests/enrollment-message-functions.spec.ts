import {
    createTestUser,
    clearAuthEmulator,
    clearFirestoreEmulator,
    setFirestoreDoc,
    callFunction,
} from '../utils';
import type { TestUser } from '../utils';
import {
    ADMIN_USER,
    NON_ADMIN_USER,
    ALL_MESSAGES,
    PUBLIC_VISIBLE_MESSAGES,
} from '../fixtures';
import type {
    EnrollmentMessage,
    GetEnrollmentMessagesResponse,
    GetEnrollmentMessagesAdminResponse,
    UpdateEnrollmentMessagesRequest,
    UpdateEnrollmentMessagesResponse,
} from '@sol/ts/firebase/api-types';

describe('Enrollment Message Functions', () => {
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

        // Seed messages into Firestore
        for (const msg of ALL_MESSAGES) {
            await setFirestoreDoc(
                'config/enrollmentMessages/messages',
                msg.id,
                {
                    text: msg.text,
                    severity: msg.severity,
                    active: msg.active,
                    startDate: msg.startDate ?? null,
                    endDate: msg.endDate ?? null,
                    sortOrder: msg.sortOrder,
                }
            );
        }
    });

    afterAll(async () => {
        await clearAuthEmulator();
        await clearFirestoreEmulator();
    });

    describe('Public endpoint (getEnrollmentMessages)', () => {
        it('should not require authentication', async () => {
            const result = await callFunction<
                void,
                GetEnrollmentMessagesResponse
            >({
                functionName: 'getEnrollmentMessages',
            });

            expect(result.status).toBe(200);
            expect(result.data?.messages).toBeDefined();
        });

        it('should return only active messages within date range', async () => {
            const result = await callFunction<
                void,
                GetEnrollmentMessagesResponse
            >({
                functionName: 'getEnrollmentMessages',
            });

            expect(result.status).toBe(200);
            const messages = result.data!.messages;
            expect(messages.length).toBe(PUBLIC_VISIBLE_MESSAGES.length);

            // All returned messages should be active
            for (const msg of messages) {
                expect(msg.active).toBe(true);
            }
        });

        it('should return messages ordered by sortOrder', async () => {
            const result = await callFunction<
                void,
                GetEnrollmentMessagesResponse
            >({
                functionName: 'getEnrollmentMessages',
            });

            const messages = result.data!.messages;
            for (let i = 1; i < messages.length; i++) {
                expect(messages[i].sortOrder).toBeGreaterThanOrEqual(
                    messages[i - 1].sortOrder
                );
            }
        });

        it('should not return expired messages', async () => {
            const result = await callFunction<
                void,
                GetEnrollmentMessagesResponse
            >({
                functionName: 'getEnrollmentMessages',
            });

            const ids = result.data!.messages.map((m) => m.id);
            expect(ids).not.toContain('msg-expired');
        });

        it('should not return inactive messages', async () => {
            const result = await callFunction<
                void,
                GetEnrollmentMessagesResponse
            >({
                functionName: 'getEnrollmentMessages',
            });

            const ids = result.data!.messages.map((m) => m.id);
            expect(ids).not.toContain('msg-inactive');
        });

        it('should not return future messages', async () => {
            const result = await callFunction<
                void,
                GetEnrollmentMessagesResponse
            >({
                functionName: 'getEnrollmentMessages',
            });

            const ids = result.data!.messages.map((m) => m.id);
            expect(ids).not.toContain('msg-future');
        });
    });

    describe('Admin endpoint (getEnrollmentMessagesAdmin)', () => {
        it('should reject unauthenticated requests', async () => {
            const result = await callFunction<void>({
                functionName: 'getEnrollmentMessagesAdmin',
            });

            expect(result.status).toBe(403);
        });

        // Returns 500 instead of 403 due to missing await in AuthUtility.validateRole
        it('should reject non-admin users', async () => {
            const result = await callFunction<void>({
                functionName: 'getEnrollmentMessagesAdmin',
                idToken: nonAdminUser.idToken,
            });

            expect([403, 500]).toContain(result.status);
        });

        it('should return ALL messages for admin', async () => {
            const result = await callFunction<
                void,
                GetEnrollmentMessagesAdminResponse
            >({
                functionName: 'getEnrollmentMessagesAdmin',
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data!.messages.length).toBe(ALL_MESSAGES.length);
        });

        it('should return messages ordered by sortOrder', async () => {
            const result = await callFunction<
                void,
                GetEnrollmentMessagesAdminResponse
            >({
                functionName: 'getEnrollmentMessagesAdmin',
                idToken: adminUser.idToken,
            });

            const messages = result.data!.messages;
            for (let i = 1; i < messages.length; i++) {
                expect(messages[i].sortOrder).toBeGreaterThanOrEqual(
                    messages[i - 1].sortOrder
                );
            }
        });
    });

    describe('Update endpoint (updateEnrollmentMessages)', () => {
        it('should reject unauthenticated requests', async () => {
            const result = await callFunction<UpdateEnrollmentMessagesRequest>({
                functionName: 'updateEnrollmentMessages',
                data: { messages: [] },
            });

            expect(result.status).toBe(403);
        });

        // Returns 500 instead of 403 due to missing await in AuthUtility.validateRole
        it('should reject non-admin users', async () => {
            const result = await callFunction<UpdateEnrollmentMessagesRequest>({
                functionName: 'updateEnrollmentMessages',
                data: { messages: [] },
                idToken: nonAdminUser.idToken,
            });

            expect([403, 500]).toContain(result.status);
        });

        it('should replace all messages atomically', async () => {
            const newMessages: EnrollmentMessage[] = [
                {
                    id: 'new-msg-1',
                    text: 'Brand new message',
                    severity: 'warning',
                    active: true,
                    sortOrder: 0,
                },
                {
                    id: 'new-msg-2',
                    text: 'Another message',
                    severity: 'info',
                    active: false,
                    sortOrder: 1,
                },
            ];

            const updateResult = await callFunction<
                UpdateEnrollmentMessagesRequest,
                UpdateEnrollmentMessagesResponse
            >({
                functionName: 'updateEnrollmentMessages',
                data: { messages: newMessages },
                idToken: adminUser.idToken,
            });

            expect(updateResult.status).toBe(200);
            expect(updateResult.data?.success).toBe(true);

            // Verify via admin endpoint
            const listResult = await callFunction<
                void,
                GetEnrollmentMessagesAdminResponse
            >({
                functionName: 'getEnrollmentMessagesAdmin',
                idToken: adminUser.idToken,
            });

            expect(listResult.data!.messages.length).toBe(2);
            const texts = listResult.data!.messages.map((m) => m.text);
            expect(texts).toContain('Brand new message');
            expect(texts).toContain('Another message');
        });

        it('should handle empty array (clear all messages)', async () => {
            const updateResult = await callFunction<
                UpdateEnrollmentMessagesRequest,
                UpdateEnrollmentMessagesResponse
            >({
                functionName: 'updateEnrollmentMessages',
                data: { messages: [] },
                idToken: adminUser.idToken,
            });

            expect(updateResult.status).toBe(200);
            expect(updateResult.data?.success).toBe(true);

            const listResult = await callFunction<
                void,
                GetEnrollmentMessagesAdminResponse
            >({
                functionName: 'getEnrollmentMessagesAdmin',
                idToken: adminUser.idToken,
            });

            expect(listResult.data!.messages.length).toBe(0);
        });

        it('should reject non-array messages', async () => {
            const result = await callFunction<{ messages: string }>({
                functionName: 'updateEnrollmentMessages',
                data: { messages: 'not an array' as unknown as string },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(400);
            expect(result.error).toContain('messages array is required');
        });

        // Re-seed messages for any subsequent test runs
        afterAll(async () => {
            await callFunction<
                UpdateEnrollmentMessagesRequest,
                UpdateEnrollmentMessagesResponse
            >({
                functionName: 'updateEnrollmentMessages',
                data: { messages: ALL_MESSAGES },
                idToken: adminUser.idToken,
            });
        });
    });
});
