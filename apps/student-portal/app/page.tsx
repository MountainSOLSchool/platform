'use client';
import * as auth from 'firebase/auth';
// import styles from './index.module.css';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import { decrement, increment, trigger } from '../store/testStore';
import { requestTestStudent, setTestStudent } from '../store/testStudent';

import './index.module.css';

import BulkUpdateForSingleUnit from '../components/Units/BulkUpdateForSingleUnit';

import { SmartTreeChart, MtnMedicUnits } from '../components/Units/TreeChart';
import { FirebaseFunctions } from '../functions/firebase-functions';
import { useRouter } from 'next/navigation';

export default function PageWrapper() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        auth.getAuth().onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                router.push('/login');
            }
        });
    });

    return <>{isLoggedIn ? <Page /> : <></>}</>;
}

function Page() {
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
                    label="Bulk Update Students for One Unit"
                    onClick={() => {
                        console.log('testing bulkUpdate is ', showBulkUpdate);
                        setShowBulkUpdate(!showBulkUpdate);
                    }}
                />
            </div>
            {showBulkUpdate ? <BulkUpdateForSingleUnit /> : null}
            Welcome to our new unit portal!!! it is super exciting!
            <BulkUpdateForSingleUnit />
            {/**NEW STUFF */}
            <SmartTreeChart />
        </div>
    );
}
