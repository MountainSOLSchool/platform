'use client';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';

export function StudentSelectionTool(props: {
    studentsArray: any;
    multiSelect?: boolean;
}) {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const selectStudent = (rowData) => {
        const selectedStudent = rowData.value;
        setSelectedStudent(selectedStudent);
    };

    const checkboxTemplate = (rowData) => {
        const unitCred = props.studentsArray.find(
            (s) => s.studentID === rowData.studentID
        ).unitCredit;
        return (
            <div>
                <Checkbox checked={unitCred} />
            </div>
        );
    };

    return (
        <div>
            <div>
                <DataTable
                    value={props.studentsArray}
                    tableStyle={{ width: '30rem', maxHeight: '500' }}
                    sortField="lastName"
                    sortOrder={-1}
                    selectionMode="single"
                    onSelectionChange={selectStudent}
                >
                    <Column key={1} field={'firstName'} header={'First Name'} />
                    <Column key={2} field={'lastName'} header={'Last Name'} />
                    <Column
                        key={4}
                        field={'studentID'}
                        header={'Student ID'}
                        hidden={true}
                    />
                    <Column
                        key={3}
                        header={'Credit for Unit'}
                        body={checkboxTemplate}
                    />
                </DataTable>
            </div>
            <div>
                <Button
                    label={'Save'}
                    onClick={() => {
                        /* updateStudents() */
                    }}
                />
            </div>
        </div>
    );
}

export default StudentSelectionTool;
