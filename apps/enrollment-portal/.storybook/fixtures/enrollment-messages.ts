import type { EnrollmentMessage } from '@sol/ts/firebase/api-types';

export const mockMessageEarlyBird: EnrollmentMessage = {
    id: 'msg-001',
    text: 'Use code <b>EARLYBIRD23</b> for $15 off each class when you enroll before June 1st!',
    severity: 'promotional',
    active: true,
    endDate: '2026-06-01T23:59:59.999Z',
    sortOrder: 0,
};

export const mockMessageInfo: EnrollmentMessage = {
    id: 'msg-002',
    text: 'Classes for the Fall 2026 semester are now open for enrollment.',
    severity: 'info',
    active: true,
    sortOrder: 1,
};

export const mockMessageWarning: EnrollmentMessage = {
    id: 'msg-003',
    text: 'Some classes have limited spots remaining. Enroll soon to secure your place!',
    severity: 'warning',
    active: true,
    startDate: '2026-01-01T00:00:00.000Z',
    sortOrder: 2,
};

export const mockMessages: EnrollmentMessage[] = [
    mockMessageEarlyBird,
    mockMessageInfo,
    mockMessageWarning,
];

export const mockMessagesEmpty: EnrollmentMessage[] = [];
