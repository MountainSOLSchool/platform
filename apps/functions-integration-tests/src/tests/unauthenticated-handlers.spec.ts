import { callFunction } from '../utils';

/**
 * These handlers authenticate via AuthUtility.getUserFromRequest, which sends a
 * 403 when there is no valid token. The handlers must NOT send a second
 * response on the `!user` branch — doing so throws ERR_HTTP_HEADERS_SENT after
 * the 403 was already sent. This suite guards that every such endpoint cleanly
 * returns 403 (and never a 200) for an unauthenticated request.
 */
describe('Unauthenticated handler rejection', () => {
    const endpoints = [
        'enroll',
        'enrollAddendum',
        'paymentToken',
        'roles',
        'myEnrolledStudents',
        'getMyStudent',
        'loadEnrollmentDraft',
        'deleteEnrollmentDraft',
        'updateEnrollmentDraft',
        'doesStudentInfoRequireReview',
        'getEnrollmentForAddendum',
    ];

    it.each(endpoints)(
        '%s should return 403 (not 200) without a token',
        async (functionName) => {
            const result = await callFunction({ functionName, data: {} });
            expect(result.status).toBe(403);
        }
    );
});
