'use client';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';

export function ClassSelectionDropdown(props: {
    classes: Array<{ displayName: string; classId: string }>;
    loading: boolean;
    onSelected: (classId: string) => void;
}) {
    const [selectedClass, setSelectedClass] = useState('');

    return (
        <>
            <Dropdown
                filter
                loading={props.loading}
                placeholder="Select a class..."
                options={props.classes}
                optionLabel="displayName"
                optionValue="classId"
                value={selectedClass}
                onChange={(e) => {
                    if (e.value != '') {
                        setSelectedClass(e.value);
                        props.onSelected(e.value);
                    }
                }}
            ></Dropdown>
        </>
    );
}

export default ClassSelectionDropdown;
