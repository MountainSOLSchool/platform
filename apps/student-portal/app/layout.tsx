'use client';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './design-tokens.css';
import './primereact-theme-overrides.css';
import './styles.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { addEpic, store } from '../store/store';
import { AddEpicContext } from '@sharakai/use-redux-observable-epic';
import { PrimeReactProvider } from 'primereact/api';
import dynamic from 'next/dynamic';
import { AuthGuard, useAuthStatus } from './auth-guard';
import { publicRoutes } from './public-routes-config';

// TODO: preventing SSR temporarily because something goes wrong with pre-rendering (likely useMediaQuery)
const Header = dynamic(() => import('../components/Header'), { ssr: false });

function RootLayout({ children }: { children: React.ReactNode }) {
    const { authStatus } = useAuthStatus(publicRoutes);

    return (
        <html>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Nunito+Sans:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
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
