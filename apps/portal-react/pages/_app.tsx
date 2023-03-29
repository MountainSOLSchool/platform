import { AppProps } from 'next/app';
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

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Provider store={store}>
                <Head>
                    <title>Welcome to portal-react!</title>
                </Head>
                <main className="app">
                    <Component {...pageProps} />
                </main>
            </Provider>
        </>
    );
}

export default CustomApp;
