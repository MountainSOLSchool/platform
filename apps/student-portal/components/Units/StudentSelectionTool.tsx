'use client';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';

export function StudentSelectionTool(props: {
    students: Array<{ displayName: string; studentId: string }>;
    onSelected: (studentId: string) => void;
}) {
    const [selectedStudent] = useState('');

    return (
        <>
            <Dropdown
                editable
                placeholder="Select a student..."
                options={props.students}
                optionLabel="displayName"
                optionValue="studentId"
                value={selectedStudent}
                onChange={(e) => {
                    props.onSelected(selectedStudent);
                }}
            ></Dropdown>
        </>
    );
}

export default StudentSelectionTool;
