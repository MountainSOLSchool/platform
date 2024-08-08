import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import StudentSelectionTool from './StudentSelectionTool';
import UnitSelectionTool from './UnitSelectionTool';

export function UpdateStudentUnits() {
    const [selectedStudent, updateSelectedStudent] = useState(null);

    const saveUpdatedUnits = () => {
        window.alert('saving student units...');
        // save student's units in firebase
    };

    const tempStudents = [
        {
            firstName: 'John',
            lastName: 'Doe',
            studentID: '123',
        },
        {
            firstName: 'Jane',
            lastName: 'Doe',
            studentID: '456',
        },
    ];

    useEffect(() => {}, [selectedStudent]);

    return (
        <div>
            <div>
                Select a student to update their units:
                <StudentSelectionTool
                    studentsArray={tempStudents}
                    multiSelect={false}
                />
            </div>
            <div>
                <UnitSelectionTool selectedStudent />
                {/* checkboxes appear by unit names if student is selected */}
                <Button
                    label="Save Updates"
                    hidden={!selectedStudent}
                    onClick={() => saveUpdatedUnits()}
                ></Button>
            </div>
        </div>
    );
}

export default UpdateStudentUnits;
