import * as auth from 'firebase/auth';
// import styles from './index.module.css';
import { Button } from 'primereact/button';
import React, { useState } from 'react';

import BulkUpdateForSingleUnit from './components/Units/BulkUpdateForSingleUnit/BulkUpdateForSingleUnit';

export function Index() {
    auth.getAuth().onAuthStateChanged((user) => {
        if (user) {
            console.log('user is signed in', user);
        } else {
            console.log('user is not signed in');
        }
    });

    const [showBulkUpdate, setShowBulkUpdate] = useState(false);

    return (
        <div>
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
        </div>
    );
}

export default Index;
