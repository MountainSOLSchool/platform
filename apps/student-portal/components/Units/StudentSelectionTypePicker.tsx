'use client';
import { SelectButton } from 'primereact/selectbutton';
import { StudentSelectionType } from './StudentSelectionType.type';

export function StudentSelectionTypePicker(props: {
    type: StudentSelectionType;
    onSelected: (type: StudentSelectionType) => void;
}) {
    return (
        <>
            <SelectButton
                options={[
                    { label: 'By Class', value: 'byClass' },
                    { label: 'All', value: 'all' },
                ]}
                value={props.type}
                onChange={(e) => {
                    props.onSelected(e.value);
                }}
            />
        </>
    );
}

export default StudentSelectionTypePicker;
