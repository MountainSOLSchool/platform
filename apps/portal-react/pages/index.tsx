/* eslint-disable prettier/prettier */
import * as auth from 'firebase/auth';
// import styles from './index.module.css';
import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import { decrement, increment, trigger } from '../store/testStore';

import './index.module.css';

import BulkUpdateForSingleUnit from './components/Units/BulkUpdateForSingleUnit/BulkUpdateForSingleUnit';

import TreeChart, { SmartTreeChart } from './components/Units/TreeChart';

export function Index() {
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

    return (
        <div>
            <div>
                data from store:
                {count}
                <Button onClick={() => dispatch(increment())}>inc</Button>
                <Button onClick={() => dispatch(decrement())}>dec</Button>
                <Button onClick={() => dispatch(trigger())}>
                    trigger load from backend
                </Button>
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
            {/* <TreeChart /> */}
        </div>
    );
}

export default Index;
