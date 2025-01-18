import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { getSolAuthClient } from '@sol/ts/firebase/firebase-config';
import { getFunctions, httpsCallable } from 'firebase/functions';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const auth = getSolAuthClient();
    const functions = getFunctions();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            if (user) {
                try {
                    const getRoles = httpsCallable(functions, 'roles');
                    const result = await getRoles();
                    const roles = result.data as string[];
                    setIsAdmin(roles.includes('admin'));
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const signOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return {
        user,
        isLoggedIn: !!user,
        isAdmin,
        signOut,
    };
}
