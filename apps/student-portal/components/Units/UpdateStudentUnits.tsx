'use client';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import StudentSelectionTool from './StudentSelectionTool';
import UpdateUnitsTool from './UpdateUnitsTool';
import { FirebaseFunctions } from 'apps/student-portal/functions/firebase-functions';

export function UpdateStudentUnits() {
    const [selectedStudent, updateSelectedStudent] = useState(null);

    const saveUpdatedUnits = (event) => {
        // save student's units in firebase
    };

    useEffect(() => {}, [selectedStudent]);

    const handleStudentSelected = (event) => {
        window.alert('eventing...');
        console.log('data is: ', event.data);
        updateSelectedStudent('asdf');
    };

    const handleUnitsUpdated = (e) => {
        console.log('updating units with data: ', e.data);
    };

    // firebase function to get all the student's units
    const isCompletedByUnitId = {};

    // test data
    const fakeScoutPath = {
        name: 'Scout',
        unitIds: ['unitId1', 'unitId2', 'unitId3'],
    };
    const fakeProviderPath = {
        name: 'Provider',
        unitIds: ['unitId3', 'unitId4', 'unitId5'],
    };
    const fakePathsArr = [fakeScoutPath, fakeProviderPath];
    const fakeUnits = {
        unitId1: {
            name: 'First Unit',
            description: 'First description',
            category: 'First category',
        },
        unitId2: {
            name: 'Second Unit',
            description: 'Second description',
            category: 'Second category',
        },
        unitId3: {
            name: 'Third Unit',
            description: 'Third description',
            category: 'Third category',
        },
        unitId4: {
            name: 'Fourth Unit',
            description: 'Fourth description',
            category: 'Fourth category',
        },
        unitId5: {
            name: 'Fifth Unit',
            description: 'Fifth description',
            category: 'Fifth category',
        },
    };

    const studentsArr = [
        { displayName: 'Sally Andershon', studentId: '3aasdf' },
    ];

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchAndSetStudents = async () => {
            const students = await FirebaseFunctions.getAllStudents([
                'first_name',
                'last_name',
                'id',
            ]);
            console.log('students are ', students);
            setStudents(
                students.map((student) => ({
                    displayName: student.first_name + ' ' + student.last_name,
                    studentId: student.id,
                }))
            );
        };
        fetchAndSetStudents();
    }, []);

    return (
        <div>
            <div>
                Select a student to update their units:
                <StudentSelectionTool
                    students={students}
                    onSelected={handleStudentSelected}
                />
            </div>
            <div>
                <UpdateUnitsTool
                    isCompletedByUnitId={{}}
                    units={fakeUnits}
                    paths={fakePathsArr}
                    onUnitsChanged={handleUnitsUpdated}
                />
                {/* checkboxes appear by unit names if student is selected */}
                <Button
                    label="Save Updates"
                    hidden={!selectedStudent}
                    onClick={() => saveUpdatedUnits}
                ></Button>
            </div>
        </div>
    );
}

export default UpdateStudentUnits;
