/* eslint-disable prettier/prettier */
import * as auth from 'firebase/auth';
import './index.module.css';

import BulkUpdateForSingleUnit from './components/Units/BulkUpdateForSingleUnit/BulkUpdateForSingleUnit';
import TreeChart, { SmartTreeChart } from './components/Units/TreeChart';

export function Index() {
    /*
     * Replace the elements below with your own.
     *
     * Note: The corresponding styles are in the ./index.css file.
     */
    auth.getAuth().onAuthStateChanged((user) => {
        if (user) {
            console.log('user is signed in', user);
        } else {
            console.log('user is not signed in');
        }
    });
    return (
        <div>
            Welcome to our new unit portal!!! it is super exciting!
            <BulkUpdateForSingleUnit />
            {/**NEW STUFF */}
            <SmartTreeChart />
            {/* <TreeChart /> */}
        </div>
    );
}

export default Index;
