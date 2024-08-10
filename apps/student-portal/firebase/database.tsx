import { getFirestore } from 'firebase/firestore';
import { getSolApp } from '@sol/ts/firebase/firebase-config';

export const db = getFirestore(getSolApp());
