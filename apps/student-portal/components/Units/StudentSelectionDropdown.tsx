'use client';
import { Dropdown } from 'primereact/dropdown';

export function StudentSelectionDropdown(props: {
    selectedStudentId: string;
    students: Array<{ displayName: string; studentId: string }>;
    loading: boolean;
    disabled?: boolean;
    onSelected: (studentId: string) => void;
}) {
    return (
        <>
            <Dropdown
                filter
                disabled={props.disabled}
                loading={props.loading}
                placeholder="Select a student..."
                options={props.students}
                optionLabel="displayName"
                optionValue="studentId"
                value={props.selectedStudentId}
                onChange={(e) => {
                    if (e.value != '') {
                        props.onSelected(e.value);
                    }
                }}
            ></Dropdown>
        </>
    );
}

export default StudentSelectionDropdown;
