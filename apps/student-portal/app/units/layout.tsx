import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div
            style={{
                margin: 20,
            }}
        >
            {children}
        </div>
    );
}
