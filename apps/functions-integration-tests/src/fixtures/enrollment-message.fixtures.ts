import type { EnrollmentMessage } from '@sol/ts/firebase/api-types';

const today = new Date();
const pastDate = new Date(today);
pastDate.setMonth(pastDate.getMonth() - 1);
const futureDate = new Date(today);
futureDate.setMonth(futureDate.getMonth() + 1);
const farFutureDate = new Date(today);
farFutureDate.setMonth(farFutureDate.getMonth() + 6);

/** Active, within date range — should appear in public endpoint */
export const ACTIVE_IN_RANGE: EnrollmentMessage = {
    id: 'msg-active-in-range',
    text: 'Registration is now open for the Spring semester!',
    severity: 'info',
    active: true,
    startDate: pastDate.toISOString(),
    endDate: futureDate.toISOString(),
    sortOrder: 0,
};

/** Active, no date constraints — should appear in public endpoint */
export const ACTIVE_NO_DATES: EnrollmentMessage = {
    id: 'msg-active-no-dates',
    text: 'Welcome to Mountain SOL!',
    severity: 'success',
    active: true,
    sortOrder: 1,
};

/** Active but end date has passed — should NOT appear in public endpoint */
export const EXPIRED_END_DATE: EnrollmentMessage = {
    id: 'msg-expired',
    text: 'Early registration discount ends soon!',
    severity: 'promotional',
    active: true,
    startDate: new Date('2024-01-01').toISOString(),
    endDate: pastDate.toISOString(),
    sortOrder: 2,
};

/** Inactive — should NOT appear in public endpoint */
export const INACTIVE_MESSAGE: EnrollmentMessage = {
    id: 'msg-inactive',
    text: 'This message is disabled.',
    severity: 'warning',
    active: false,
    sortOrder: 3,
};

/** Active but start date is in the future — should NOT appear in public endpoint */
export const FUTURE_START_DATE: EnrollmentMessage = {
    id: 'msg-future',
    text: 'Summer camp registration coming soon!',
    severity: 'info',
    active: true,
    startDate: futureDate.toISOString(),
    endDate: farFutureDate.toISOString(),
    sortOrder: 4,
};

export const ALL_MESSAGES: EnrollmentMessage[] = [
    ACTIVE_IN_RANGE,
    ACTIVE_NO_DATES,
    EXPIRED_END_DATE,
    INACTIVE_MESSAGE,
    FUTURE_START_DATE,
];

/** Messages expected from the public (filtered) endpoint */
export const PUBLIC_VISIBLE_MESSAGES: EnrollmentMessage[] = [
    ACTIVE_IN_RANGE,
    ACTIVE_NO_DATES,
];
