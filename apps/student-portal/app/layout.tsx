'use client';
// primereact theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';
// primereact core
import 'primereact/resources/primereact.min.css';
// primereact icons
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { addEpic, store } from '../store/store';
import { AddEpicContext } from '@sharakai/use-redux-observable-epic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as auth from 'firebase/auth';
import { PrimeReactProvider } from 'primereact/api';
import LoginWithRegisteredEpics from './login/page';

function RootLayout({ children }: { children: React.ReactNode }) {
    // TODO: add to provider
    const isLoggedIn = useIsLoggedIn();

    return (
        <html>
            <body style={{ margin: 5 }}>
                <PrimeReactProvider>
                    <Provider store={store}>
                        <AddEpicContext.Provider value={addEpic}>
                            <Head>
                                <title>Mountain SOL Student Portal</title>
                            </Head>
                            <main className="app">
                                {isLoggedIn ? (
                                    children
                                ) : (
                                    <LoginWithRegisteredEpics />
                                )}
                            </main>
                        </AddEpicContext.Provider>
                    </Provider>
                </PrimeReactProvider>
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
                // router.push('/login');
            }
        });
    });

    return isLoggedIn;
}
