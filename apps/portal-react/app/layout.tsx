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
import { store } from '../store/store';

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <Provider store={store}>
                    <Head>
                        <title>Welcome to portal-react!</title>
                    </Head>
                    <main className="app">{children}</main>
                </Provider>
            </body>
        </html>
    );
}

export default RootLayout;
