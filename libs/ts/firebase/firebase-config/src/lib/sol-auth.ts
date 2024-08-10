import * as auth from 'firebase/auth';
import { getSolApp } from './sol-app';

let _solAuth: auth.Auth | undefined;

export const getSolAuth = () => {
    _solAuth ??= auth.getAuth(getSolApp());
    return _solAuth;
};
