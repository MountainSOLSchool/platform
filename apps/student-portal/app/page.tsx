'use client';
// import styles from './index.module.css';
import { Button } from 'primereact/button';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import { decrement, increment, trigger } from '../store/testStore';
import { requestTestStudent, setTestStudent } from '../store/testStudent';
import './index.module.css';
import { SmartTreeChart, MtnMedicUnits } from '../components/Units/TreeChart';
import { useRouter } from 'next/navigation';

export default function Page() {
    const dispatch = useDispatch();
    const count = useSelector((state: RootState) => state.counter.value);

    const router = useRouter();

    return (
        <div>
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
