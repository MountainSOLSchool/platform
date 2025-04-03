'use client';
// primereact theme
import 'primereact/resources/themes/lara-light-blue/theme.css';
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
import dynamic from 'next/dynamic';
import { ProgressSpinner } from 'primereact/progressspinner';

// TODO: preventing SSR temporarily because something goes wrong with pre-rendering (likely useMediaQuery)
const Header = dynamic(() => import('../components/Header'), { ssr: false });

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

function RootLayout({ children }: { children: React.ReactNode }) {
    const { authStatus } = useAuthStatus();

    return (
        <html>
            <body style={{ margin: 0 }}>
                <PrimeReactProvider>
                    <Provider store={store}>
                        <AddEpicContext.Provider value={addEpic}>
                            {authStatus !== 'loading' && <Header />}
                            <Head>
                                <title>Mountain SOL Student Portal</title>
                            </Head>
                            <main className="app">
                                {authStatus === 'loading' ? (
                                    <div
                                        className="flex justify-content-center align-items-center"
                                        style={{ height: '100vh' }}
                                    >
                                        <ProgressSpinner />
                                    </div>
                                ) : authStatus === 'authenticated' ? (
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

function useAuthStatus() {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.getAuth().onAuthStateChanged((user) => {
            if (user) {
                setAuthStatus('authenticated');
            } else {
                setAuthStatus('unauthenticated');
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    return { authStatus };
}
