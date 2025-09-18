import { usePathname, useRouter } from 'next/navigation';
import { ProgressSpinner } from 'primereact/progressspinner';
import LoginWithRegisteredEpics from './login/page';
import { useState, useEffect } from 'react';
import * as auth from 'firebase/auth';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export function isPublicRoute(
    publicRoutes: Array<string>,
    pathname: string
): boolean {
    return publicRoutes.some((route) => {
        const pattern = route.replace(/:\w+/g, '[^/]+').replace(/\//g, '\\/');

        const regex = new RegExp(`^${pattern}$`);
        return regex.test(pathname);
    });
}

export function useAuthStatus() {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.getAuth().onAuthStateChanged((user) => {
            if (user) {
                setAuthStatus('authenticated');
            } else {
                setAuthStatus('unauthenticated');
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    return { authStatus };
}

export function AuthGuard({
    publicRoutes,
    children,
}: {
    publicRoutes: Array<string>;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { authStatus } = useAuthStatus();

    if (isPublicRoute(publicRoutes, pathname)) {
        return <>{children}</>;
    }

    if (authStatus === 'loading') {
        return (
            <div
                className="flex justify-content-center align-items-center"
                style={{ height: '100vh' }}
            >
                <ProgressSpinner />
            </div>
        );
    }

    if (authStatus === 'unauthenticated') {
        return <LoginWithRegisteredEpics />;
    }

    return <>{children}</>;
}
