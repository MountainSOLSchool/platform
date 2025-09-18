'use client';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { addEpic, store } from '../store/store';
import { AddEpicContext } from '@sharakai/use-redux-observable-epic';
import { PrimeReactProvider } from 'primereact/api';
import dynamic from 'next/dynamic';
import { AuthGuard, useAuthStatus } from './auth-guard';

// TODO: preventing SSR temporarily because something goes wrong with pre-rendering (likely useMediaQuery)
const Header = dynamic(() => import('../components/Header'), { ssr: false });

export const publicRoutes = ['/units/student/:id'];

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
                                <AuthGuard publicRoutes={publicRoutes}>
                                    {children}
                                </AuthGuard>
                            </main>
                        </AddEpicContext.Provider>
                    </Provider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}

export default RootLayout;
