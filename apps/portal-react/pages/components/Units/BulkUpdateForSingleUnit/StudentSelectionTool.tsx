import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import React, { useState } from 'react';

export function StudentSelectionTool(props) {
    const tempStudents = [
        {
            firstName: 'John',
            lastName: 'Doe',
            studentID: '123',
            unitCredit: false,
        },
        {
            firstName: 'Jane',
            lastName: 'Doe',
            studentID: '456',
            unitCredit: true,
        },
    ];
    const [studentsArr, setStudentsArr] = useState(tempStudents);

    const selectStudent = (rowData) => {
        const selectedStudent = rowData.value ? rowData.value : rowData;
        const newStudentsArr = studentsArr.map((s) => {
            if (s.studentID == selectedStudent.studentID) {
                return { ...s, unitCredit: !s.unitCredit };
            }
            return s;
        });
        setStudentsArr(newStudentsArr);
    };

    const updateStudents = (event) => {
        console.log('studentsArr: ', studentsArr);

        // save updates to backend
    };

    const checkboxTemplate = (rowData) => {
        console.log(rowData);
        const unitCred = studentsArr.find(
            (s) => s.studentID === rowData.studentID
        ).unitCredit;
        return (
            <div>
                <Checkbox
                    checked={unitCred}
                    onChange={() => {
                        selectStudent(rowData);
                    }}
                />
            </div>
        );
    };

    return (
        <div>
            <div>
                <DataTable
                    value={studentsArr}
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
                <Button label={'Save'} onClick={updateStudents} />
            </div>
        </div>
    );
}

export default StudentSelectionTool;
