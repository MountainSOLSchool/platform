import { db } from './database.config';

void (await db.collection('config').doc('activeSemester').get());

export {};
