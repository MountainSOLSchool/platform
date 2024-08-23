'use client';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';

export function StudentSelectionTool(props: {
    students: Array<{ displayName: string; studentId: string }>;
    loading: boolean;
    onSelected: (studentId: string) => void;
}) {
    const [selectedStudent, setSelectedStudent] = useState('');

    return (
        <>
            <Dropdown
                filter
                loading={props.loading}
                placeholder="Select a student..."
                options={props.students}
                optionLabel="displayName"
                optionValue="studentId"
                value={selectedStudent}
                onChange={(e) => {
                    if (e.value != '') {
                        setSelectedStudent(e.value);
                        props.onSelected(e.value);
                    }
                }}
            ></Dropdown>
        </>
    );
}

export default StudentSelectionTool;
