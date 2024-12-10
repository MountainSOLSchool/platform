'use client';
import { Dropdown } from 'primereact/dropdown';

export function SemesterSelectionDropdown(props: {
    selectedSemesterId: string;
    semesters: Array<{ displayName: string; semesterId: string }>;
    loading: boolean;
    onSelected: (semesterId: string) => void;
}) {
    return (
        <>
            <Dropdown
                filter
                loading={props.loading}
                placeholder="Select a semester..."
                options={props.semesters}
                optionLabel="displayName"
                optionValue="semesterId"
                value={props.selectedSemesterId}
                onChange={(e) => {
                    if (e.value != '') {
                        props.onSelected(e.value);
                    }
                }}
            ></Dropdown>
        </>
    );
}

export default SemesterSelectionDropdown;
