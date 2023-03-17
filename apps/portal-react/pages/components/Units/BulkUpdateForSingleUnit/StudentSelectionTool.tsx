import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import React, { useState } from 'react';

export function StudentSelectionTool(props) {
    const [selectedStudents, setSelectedStudents] = useState([]);

    const tempStudents = [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Doe' },
    ];

    const selectStudent = (event) => {
        // need studentID here
        console.log('event data is ', event.target);

        const student = event.target.value;
        if (event.target.checked) {
            setSelectedStudents([...selectedStudents, student]);
        } else {
            setSelectedStudents(selectedStudents.filter((s) => s !== student));
        }
    };

    const updateStudents = (event) => {
        console.log('selected students arr is ', selectedStudents);

        // save updates to backend
    };

    return (
        <div>
            <div>
                -- student selection tool --
                <DataTable
                    value={tempStudents}
                    tableStyle={{ width: '30rem', maxHeight: '500' }}
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
                        field={'unitCredit'}
                        header={'Credit for Unit'}
                        body={
                            <div>
                                <input
                                    type="checkbox"
                                    onClick={selectStudent}
                                />
                            </div>
                        }
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
