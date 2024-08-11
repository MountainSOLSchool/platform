'use client';
// import styles from './index.module.css';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import { decrement, increment, trigger } from '../store/testStore';
import { requestTestStudent, setTestStudent } from '../store/testStudent';
import './index.module.css';
import { SmartTreeChart, MtnMedicUnits } from '../components/Units/TreeChart';
import { FirebaseFunctions } from '../functions/firebase-functions';

export default function Page() {
    const [showBulkUpdate, setShowBulkUpdate] = useState(false);

    const dispatch = useDispatch();
    const count = useSelector((state: RootState) => state.counter.value);
    const pathData = useSelector((state: RootState) => state.paths);
    const units = useSelector((state: RootState) => state.units);
    const testStudent = useSelector((state: RootState) => state.student);

    useEffect(() => {
        console.log(
            'state => ',
            'paths: ',
            pathData,
            'units: ',
            units,
            'test student: ',
            testStudent
        );
    });

    // -- EXAMPLE OF FETCHING STUDENTS FROM FIREBASE
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchAndSetStudents = async () => {
            const students = await FirebaseFunctions.getAllStudents([
                'first_name',
            ]);
            console.log('students are ', students);
            setStudents(students);
        };
        fetchAndSetStudents();
    }, []);
    // -- END EXAMPLE

    // -- EXAMPLE OF FETCHING PATHS FROM FIREBASE
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        const fetchAndSetPaths = async () => {
            const { paths, units } =
                await FirebaseFunctions.getFullUnitsAndPaths();
            console.log('paths are ', paths);
            setPaths(paths);
        };
        fetchAndSetPaths();
    }, []);
    // -- END EXAMPLE

    // -- EXAMPLE OF FETCHING COMPLETED UNITS FROM FIREBASE
    const [completedUnits, setCompletedUnits] = useState([]);

    useEffect(() => {
        const fetchCompletedUnits = async () => {
            const completedUnitIds =
                await FirebaseFunctions.getCompletedUnitIds(
                    'zWKUjbHAUOFJBKo38LYw'
                );
            console.log('completed units are ', completedUnitIds);
            setCompletedUnits(completedUnitIds);
        };
        fetchCompletedUnits();
    }, []);
    // -- END EXAMPLE

    return (
        <div>
            <div>
                students is&nbsp;
                {students
                    .sort((a, b) => a.first_name.localeCompare(b.first_name))
                    .map((student) => student.first_name)
                    .join(', ')}
            </div>
            <br />
            <div>
                paths is&nbsp;
                {paths
                    // .sort((a, b) => a.first_name.localeCompare(b.first_name))
                    .map((path) => path.name)
                    .join(', ')}
            </div>
            <br />
            <div>
                completed units is&nbsp;
                {completedUnits.join(', ')}
            </div>
            <div>
                <br />
                data from store:
                {count}
                <Button onClick={() => dispatch(increment())}>inc</Button>
                <Button onClick={() => dispatch(decrement())}>dec</Button>
                <Button onClick={() => dispatch(trigger())}>request 100</Button>
                <Button
                    onClick={() => dispatch(requestTestStudent())}
                    style={{ marginLeft: '2rem' }}
                >
                    get test student from database!
                </Button>
                <Button
                    onClick={() =>
                        dispatch(
                            setTestStudent({
                                name: 'Student',
                                completedUnits: MtnMedicUnits,
                            })
                        )
                    }
                >
                    GET TEST NOOB
                </Button>
                <br />
            </div>
            Welcome to our new unit portal!!! it is super exciting! Here are
            some things you can do:
            <div>
                <Button
                    label="View Units, Update Student Units"
                    onClick={() => {
                        router.push('/units');
                    }}
                />
            </div>
            Welcome to our new unit portal!!! it is super exciting!
            {/**NEW STUFF */}
            <SmartTreeChart />
        </div>
    );
}
