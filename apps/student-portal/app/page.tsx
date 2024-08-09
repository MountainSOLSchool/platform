'use client';
import * as auth from 'firebase/auth';
// import styles from './index.module.css';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import { decrement, increment, trigger } from '../store/testStore';
import { requestTestStudent, setTestStudent } from '../store/testStudent';
import {
    connectFunctionsEmulator,
    getFunctions,
    httpsCallable,
} from 'firebase/functions';

import './index.module.css';

import BulkUpdateForSingleUnit from '../components/Units/BulkUpdateForSingleUnit';

import { SmartTreeChart, MtnMedicUnits } from '../components/Units/TreeChart';

const functions = getFunctions();
// TODO: remove this when we are done testing
connectFunctionsEmulator(functions, 'localhost', 5001);

function Page() {
    auth.getAuth().onAuthStateChanged((user) => {
        if (user) {
            console.log('user is signed in', user);
        } else {
            console.log('user is not signed in');
        }
    });

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

    // load students from firebase function 'allStudents'

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const allStudents = httpsCallable(functions, 'allStudents');
        allStudents()
            .then((response) => response.data as any)
            .then(({ students }) => setStudents(students));
    }, []);

    return (
        <div>
            <div>
                students is
                {students
                    .sort((a, b) => a.first_name.localeCompare(b.first_name))
                    .map((student) => student.first_name)
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

export default Page;
