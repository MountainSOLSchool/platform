'use client';
import Head from 'next/head';
import './styles.css';
// primereact theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';
// primereact core
import 'primereact/resources/primereact.min.css';
// primereact icons
import 'primeicons/primeicons.css';
import { Provider } from 'react-redux';
import { addEpic, store } from '../store/store';
import { AddEpicContext } from '@sharakai/use-redux-observable-epic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as auth from 'firebase/auth';

function RootLayout({ children }: { children: React.ReactNode }) {
    const isLoggedIn = useIsLoggedIn();

    return (
        <html>
            <body>
                <Provider store={store}>
                    <AddEpicContext.Provider value={addEpic}>
                        <Head>
                            <title>Welcome to student-portal!</title>
                        </Head>
                        <main className="app">
                            {isLoggedIn ? children : <></>}
                        </main>
                    </AddEpicContext.Provider>
                </Provider>
            </body>
        </html>
    );
}

export default RootLayout;

function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        auth.getAuth().onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                router.push('/login');
            }
        });
    });

    return isLoggedIn;
}
