import styles from './index.module.css';
import * as auth from 'firebase/auth';

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
    return <div>hello</div>;
}

export default Index;
