import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { initializeApp } from 'firebase/app';

const app = initializeApp({
    apiKey: 'AIzaSyBxv66X_Ye4MXI5lt8Sjc1xz88rdWJJ0ho',
    authDomain: 'mountain-sol-platform.web.app',
    projectId: 'mountain-sol-platform',
    storageBucket: 'mountain-sol-platform.appspot.com',
    messagingSenderId: '319228048592',
    appId: '1:319228048592:web:2d418795ca948ba2665ad5',
    measurementId: 'G-QN03ENCDDC',
});

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Welcome to portal-react!</title>
            </Head>
            <main className="app">
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default CustomApp;
