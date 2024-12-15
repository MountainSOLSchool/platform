'use client';
import { Dropdown } from 'primereact/dropdown';

type Season = 'winter' | 'spring' | 'summer' | 'fall';
type SemesterOption = {
    displayName: string;
    semesterId: string;
};

const seasonOrder: Record<Season, number> = {
    winter: 0,
    spring: 1,
    summer: 2,
    fall: 3,
};

const parseSemester = (
    semesterStr: string
): { season: Season; year: number } => {
    const match = semesterStr.match(/^(winter|spring|summer|fall)(\d{4})$/i);
    if (!match) {
        throw new Error(`Invalid semester format: ${semesterStr}`);
    }

    return {
        season: match[1].toLowerCase() as Season,
        year: parseInt(match[2]),
    };
};

const compareSemesters = (a: string, b: string): number => {
    const semA = parseSemester(a);
    const semB = parseSemester(b);

    if (semA.year !== semB.year) {
        return semA.year - semB.year;
    }

    return seasonOrder[semA.season] - seasonOrder[semB.season];
};

export function SemesterSelectionDropdown(props: {
    selectedSemesterId: string;
    semesters: Array<SemesterOption>;
    loading: boolean;
    disabled?: boolean;
    onSelected: (semesterId: string) => void;
}) {
    const sortedSemesters = [...props.semesters]
        .sort((a, b) => compareSemesters(a.semesterId, b.semesterId))
        .reverse();

    return (
        <Dropdown
            filter
            disabled={props.disabled}
            loading={props.loading}
            placeholder="Select a semester..."
            options={sortedSemesters}
            optionLabel="displayName"
            optionValue="semesterId"
            value={props.selectedSemesterId}
            onChange={(e) => {
                if (e.value !== '') {
                    props.onSelected(e.value);
                }
            }}
        />
    );
}

export default SemesterSelectionDropdown;
