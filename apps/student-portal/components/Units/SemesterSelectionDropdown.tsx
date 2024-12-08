'use client';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';

export function SemesterSelectionDropdown(props: {
    semesters: Array<{ displayName: string; semesterId: string }>;
    loading: boolean;
    onSelected: (semesterId: string) => void;
}) {
    const [selectedSemester, setSelectedSemester] = useState('');

    return (
        <>
            <Dropdown
                filter
                loading={props.loading}
                placeholder="Select a semester..."
                options={props.semesters}
                optionLabel="displayName"
                optionValue="semesterId"
                value={selectedSemester}
                onChange={(e) => {
                    if (e.value != '') {
                        setSelectedSemester(e.value);
                        props.onSelected(e.value);
                    }
                }}
            ></Dropdown>
        </>
    );
}

export default SemesterSelectionDropdown;
