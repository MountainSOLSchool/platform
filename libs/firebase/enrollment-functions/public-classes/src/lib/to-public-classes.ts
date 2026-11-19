import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';

export interface PublicClass {
    id: string;
    title: string;
    classType: string;
    days: Array<string>;
    dailyTimes: string;
    startDate: string;
    endDate: string;
    registrationEndDate: string;
    gradeRangeStart: number;
    gradeRangeEnd: number;
    location: string;
    cost: number;
    paymentRange: { lowest: number; highest: number } | null;
    description: string;
    full: boolean;
    forInformationOnly: boolean;
}

export interface PublicClassGroup {
    id: string;
    name: string;
    cost: number;
    classes: Array<PublicClass>;
}

export interface PublicSemester {
    id: string;
    name: string;
    classes: Array<PublicClass>;
    groups: Array<PublicClassGroup>;
}

const DAY_ORDER = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
const DAY_NAMES: Record<string, string> = {
    Su: 'Sunday',
    M: 'Monday',
    Tu: 'Tuesday',
    W: 'Wednesday',
    Th: 'Thursday',
    F: 'Friday',
    Sa: 'Saturday',
};
const DAY_ALIASES: Record<string, string> = {
    su: 'Su',
    sun: 'Su',
    sunday: 'Su',
    m: 'M',
    mon: 'M',
    monday: 'M',
    tu: 'Tu',
    tue: 'Tu',
    tues: 'Tu',
    tuesday: 'Tu',
    w: 'W',
    wed: 'W',
    wednesday: 'W',
    th: 'Th',
    thu: 'Th',
    thur: 'Th',
    thurs: 'Th',
    thursday: 'Th',
    f: 'F',
    fri: 'F',
    friday: 'F',
    sa: 'Sa',
    sat: 'Sa',
    saturday: 'Sa',
};

// Same formats the admin weekday selector writes: "M", "Tu, Th", "M-F",
// "M-W", "Weekends", "Every Day".
export function toDayNames(weekday: string | undefined): Array<string> {
    const normalized = (weekday ?? '').toLowerCase().trim();
    if (!normalized) return [];
    if (normalized === 'every day' || normalized === 'daily') {
        return DAY_ORDER.map((d) => DAY_NAMES[d]);
    }
    if (normalized === 'weekends') return ['Saturday', 'Sunday'];
    if (normalized === 'm-f' || normalized === 'weekdays') {
        return ['M', 'Tu', 'W', 'Th', 'F'].map((d) => DAY_NAMES[d]);
    }
    const range = normalized.match(/^([a-z]+)\s*[-–]\s*([a-z]+)$/);
    if (range) {
        const start = DAY_ORDER.indexOf(DAY_ALIASES[range[1]] ?? '');
        const end = DAY_ORDER.indexOf(DAY_ALIASES[range[2]] ?? '');
        if (start !== -1 && end !== -1 && start <= end) {
            return DAY_ORDER.slice(start, end + 1).map((d) => DAY_NAMES[d]);
        }
    }
    const codes = normalized
        .split(/[,\s/&]+/)
        .map((part) => DAY_ALIASES[part])
        .filter((code): code is string => !!code);
    return DAY_ORDER.filter((d) => codes.includes(d)).map((d) => DAY_NAMES[d]);
}

// Class dates are stored as midnight Eastern, so format in Eastern time to
// keep the calendar day.
export function toEasternDate(ms: number): string {
    if (!ms) return '';
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(ms));
}

export function toPublicClass(c: SemesterClass): PublicClass {
    return {
        id: c.id,
        title: c.title,
        classType: c.classType ?? '',
        days: toDayNames(c.weekday),
        dailyTimes: c.dailyTimes ?? '',
        startDate: toEasternDate(c.startMs),
        endDate: toEasternDate(c.endMs),
        registrationEndDate: toEasternDate(c.registrationEndMs),
        gradeRangeStart: c.gradeRangeStart,
        gradeRangeEnd: c.gradeRangeEnd,
        location: c.location ?? '',
        cost: c.cost,
        paymentRange: c.paymentRange
            ? {
                  lowest: c.paymentRange.lowest,
                  highest: c.paymentRange.highest,
              }
            : null,
        description: (c.description ?? '').trim(),
        full: c.pausedForEnrollment,
        forInformationOnly: c.forInformationOnly,
    };
}

export function toPublicSemester(
    semester: { id: string; name: string },
    classes: Array<SemesterClass>,
    groups: Array<SemesterClassGroup>
): PublicSemester {
    return {
        id: semester.id,
        name: semester.name ?? '',
        classes: classes.map(toPublicClass),
        groups: groups.map((g) => ({
            id: g.id,
            name: g.name,
            cost: g.cost,
            classes: g.classes.map(toPublicClass),
        })),
    };
}
