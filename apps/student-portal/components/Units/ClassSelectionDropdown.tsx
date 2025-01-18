'use client';
import { Dropdown } from 'primereact/dropdown';

export function ClassSelectionDropdown(props: {
    selectedClassId: string;
    classes: Array<{ displayName: string; classId: string }>;
    loading: boolean;
    disabled?: boolean;
    onSelected: (classId: string) => void;
}) {
    return (
        <>
            <Dropdown
                filter
                disabled={props.disabled}
                loading={props.loading}
                placeholder="Select a class..."
                options={props.classes}
                optionLabel="displayName"
                optionValue="classId"
                value={props.selectedClassId}
                onChange={(e) => {
                    if (e.value != '') {
                        props.onSelected(e.value);
                    }
                }}
            ></Dropdown>
        </>
    );
}

export default ClassSelectionDropdown;
