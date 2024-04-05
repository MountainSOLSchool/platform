import styles from './redux-request.module.css';

/* eslint-disable-next-line */
export interface ReduxRequestProps {}

export function ReduxRequest(props: ReduxRequestProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to ReduxRequest!</h1>
        </div>
    );
}

export default ReduxRequest;
