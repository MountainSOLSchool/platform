'use client';
import { useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';

export type StudentSelectionType = 'byClass' | 'all';

export function StudentSelectionTypePicker(props: {
    onSelected: (type: StudentSelectionType) => void;
}) {
    const [selectedType, setSelectedType] = useState<StudentSelectionType>();

    return (
        <>
            <SelectButton
                options={[
                    { label: 'By Class', value: 'byClass' },
                    { label: 'All', value: 'all' },
                ]}
                value={selectedType}
                onChange={(e) => {
                    setSelectedType(e.value);
                    props.onSelected(e.value);
                }}
            />
        </>
    );
}

export default StudentSelectionTypePicker;
