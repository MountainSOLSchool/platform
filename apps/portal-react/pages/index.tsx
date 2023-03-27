/* eslint-disable prettier/prettier */
import * as auth from 'firebase/auth';
// import styles from './index.module.css';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import { decrement, increment, trigger } from '../store/testStore';
import { loadedPaths, requestPaths } from '../store/paths';
import { requestUnits } from '../store/unitStore';

import './index.module.css';

import BulkUpdateForSingleUnit from '../components/Units/BulkUpdateForSingleUnit/BulkUpdateForSingleUnit';

import { SmartTreeChart } from '../components/Units/TreeChart';

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
    const pathData = useSelector((state: RootState) => state.paths);
    
    useEffect(()=>{
        console.table(pathData)
    })

    return (
        <div>
            <div>
                <br />
                data from store:
                {count}
                <Button onClick={() => dispatch(increment())}>inc</Button>
                <Button onClick={() => dispatch(decrement())}>dec</Button>
                <Button onClick={() => dispatch(trigger())} >request 100</Button>
                <Button onClick={() => dispatch(requestPaths())} style={{"marginLeft": "2rem"}}>
                    console log path data from firebase!
                </Button>
                <Button onClick={() => dispatch(requestUnits())}>get units from database</Button>
                <br />
                <h2>number of paths loaded: </h2>
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

export default Index;
