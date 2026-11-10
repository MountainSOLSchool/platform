import { onRequest } from 'firebase-functions/v2/https';
import {
    _getCategorizedClasses,
    _getSemestersAvailableToEnroll,
} from '@sol/firebase/enrollment-functions/shared';
import { toPublicSemester } from './to-public-classes';

// Plain onRequest instead of Functions.endpoint: callers are servers (the
// WordPress site) that send no Origin header, and the data is public.
export const publicClasses = onRequest(
    { cors: true },
    async (request, response) => {
        if (request.method !== 'GET') {
            response.status(405).set('Allow', 'GET').send({ error: 'Use GET' });
            return;
        }
        try {
            const semesters = await _getSemestersAvailableToEnroll();
            const publicSemesters = await Promise.all(
                semesters.map(async (semester) => {
                    const { classesNotInGroups, groups } =
                        await _getCategorizedClasses(semester.id, {
                            onlyOpenForRegistration: true,
                        });
                    return toPublicSemester(
                        semester,
                        classesNotInGroups,
                        groups
                    );
                })
            );
            response
                .set('Cache-Control', 'public, max-age=300, s-maxage=600')
                .send({ semesters: publicSemesters });
        } catch (error) {
            console.error('publicClasses failed', error);
            response
                .status(500)
                .set('Cache-Control', 'no-store')
                .send({ error: 'Could not load classes' });
        }
    }
);
