import styles from './react-auth.module.css';

/* eslint-disable-next-line */
export interface ReactAuthProps {}

export function ReactAuth(props: ReactAuthProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to ReactAuth!</h1>
        </div>
    );
}

export default ReactAuth;
