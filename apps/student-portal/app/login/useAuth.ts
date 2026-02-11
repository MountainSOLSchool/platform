import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { getSolAuthClient } from '@sol/ts/firebase/firebase-config';
import { FirebaseFunctions } from '../../firebase/functions';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMedicAdmin, setIsMedicAdmin] = useState(false);
    const auth = getSolAuthClient();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            if (user) {
                try {
                    const roles = await FirebaseFunctions.getRoles();
                    setIsAdmin(roles.includes('admin'));
                    setIsMedicAdmin(roles.includes('medic_admin'));
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    setIsAdmin(false);
                    setIsMedicAdmin(false);
                }
            } else {
                setIsAdmin(false);
                setIsMedicAdmin(false);
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
        isMedicAdmin,
        signOut,
    };
}
