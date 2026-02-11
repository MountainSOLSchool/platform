'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../app/login/useAuth';

const ENROLLMENT_BASE = 'https://enrollment.mountainsol.org';

const Header = () => {
    const isDesktop = useMediaQuery({ minWidth: 600 });
    const router = useRouter();
    const { user, isAdmin, isMedicAdmin, signOut } = useAuth();

    const adminMenuRef = useRef<Menu>(null);
    const userMenuRef = useRef<Menu>(null);
    const mobileMenuRef = useRef<Menu>(null);

    const adminMenuItems = [
        { label: 'Class Registration', url: `${ENROLLMENT_BASE}/classes/enrollment` },
        { separator: true },
        { label: 'Admin', disabled: true, style: { fontSize: '12px', opacity: 0.6 } },
        { label: 'Dashboard', url: `${ENROLLMENT_BASE}/admin` },
        { label: 'Manage Classes', url: `${ENROLLMENT_BASE}/admin/classes/management` },
        { label: 'Class Forms and Contacts', url: `${ENROLLMENT_BASE}/admin/report` },
        { label: 'Student Info Sheets', url: `${ENROLLMENT_BASE}/admin/students` },
        { label: 'T-shirt Sizes', url: `${ENROLLMENT_BASE}/admin/t-shirts` },
        { label: 'Enrollments', url: `${ENROLLMENT_BASE}/admin/enrollments` },
        { label: 'Class Calendar', url: `${ENROLLMENT_BASE}/calendar/classes` },
        { label: 'Student Units', command: () => router.push('/units') },
        ...(isMedicAdmin ? [
            { separator: true },
            { label: 'Medic Admin', disabled: true, style: { fontSize: '12px', opacity: 0.6 } },
            { label: 'Manage Medic Classes', url: `${ENROLLMENT_BASE}/medic/admin/classes` },
            { label: 'Medic Enrollments', url: `${ENROLLMENT_BASE}/medic/admin/enrollments` },
        ] : []),
    ];

    const emailDisplay = user?.email
        ? (user.email.length > 20 ? user.email.substring(0, 20) + '...' : user.email)
        : 'User';

    const userMenuItems = user ? [
        { label: emailDisplay, disabled: true },
        { separator: true },
        { label: 'Sign Out', icon: 'pi pi-sign-out', command: () => signOut() },
    ] : [];

    const mobileMenuItems = [
        ...(user ? [
            { label: emailDisplay, disabled: true },
            { separator: true },
            { label: 'Sign Out', icon: 'pi pi-sign-out', command: () => signOut() },
        ] : [
            { label: 'Register / Sign In', icon: 'pi pi-sign-in', command: () => router.push('/user/create') },
        ]),
        ...(isAdmin ? [
            { separator: true },
            { label: 'Admin', disabled: true, style: { fontSize: '12px', opacity: 0.6 } },
            { label: 'Dashboard', url: `${ENROLLMENT_BASE}/admin` },
            { label: 'Manage Classes', url: `${ENROLLMENT_BASE}/admin/classes/management` },
            { label: 'Class Forms and Contacts', url: `${ENROLLMENT_BASE}/admin/report` },
            { label: 'Student Info Sheets', url: `${ENROLLMENT_BASE}/admin/students` },
            { label: 'T-shirt Sizes', url: `${ENROLLMENT_BASE}/admin/t-shirts` },
            { label: 'Enrollments', url: `${ENROLLMENT_BASE}/admin/enrollments` },
            { label: 'Class Calendar', url: `${ENROLLMENT_BASE}/calendar/classes` },
            { label: 'Student Units', command: () => router.push('/units') },
        ] : []),
        ...(isMedicAdmin ? [
            { separator: true },
            { label: 'Medic Admin', disabled: true, style: { fontSize: '12px', opacity: 0.6 } },
            { label: 'Manage Medic Classes', url: `${ENROLLMENT_BASE}/medic/admin/classes` },
            { label: 'Medic Enrollments', url: `${ENROLLMENT_BASE}/medic/admin/enrollments` },
        ] : []),
    ];

    const iconButtonStyle: React.CSSProperties = {
        background: 'transparent',
        border: 'none',
        color: '#fff',
        borderRadius: 0,
        width: '40px',
        height: '40px',
    };

    const splitButtonStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '24px',
        overflow: 'hidden',
    };

    const splitDividerStyle: React.CSSProperties = {
        width: '1px',
        height: '24px',
        background: 'rgba(255,255,255,0.3)',
    };

    const leftContents = (
        <div
            className="flex items-center cursor-pointer p-toolbar-group-left"
            onClick={() => router.push('/')}
        >
            <Image
                src="https://www.mountainsol.org/wp-content/uploads/2023/07/Banner-4.png"
                alt="sol-logo"
                width={isDesktop ? 218 : 153}
                height={isDesktop ? 50 : 35}
                className="mr-2"
            />
            <h2 className="m-0">{isDesktop ? 'Student Portal' : 'Portal'}</h2>
        </div>
    );

    const rightContents = (
        <div className="flex items-center">
            {isDesktop ? (
                (isAdmin || isMedicAdmin) ? (
                    <div style={splitButtonStyle}>
                        <Button
                            icon="pi pi-bars"
                            style={iconButtonStyle}
                            onClick={(e) => adminMenuRef.current?.toggle(e)}
                            aria-label="Admin menu"
                        />
                        <div style={splitDividerStyle} />
                        {user ? (
                            <Button
                                icon="pi pi-user"
                                style={iconButtonStyle}
                                onClick={(e) => userMenuRef.current?.toggle(e)}
                                aria-label="User menu"
                            />
                        ) : (
                            <Button
                                label="Sign In"
                                style={{ ...iconButtonStyle, width: 'auto', padding: '0 12px', fontSize: '14px', fontWeight: 500 }}
                                onClick={() => router.push('/user/create')}
                            />
                        )}
                    </div>
                ) : user ? (
                    <Avatar
                        size="large"
                        icon="pi pi-user"
                        onClick={(e) => userMenuRef.current?.toggle(e)}
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}
                    />
                ) : (
                    <Button
                        onClick={() => router.push('/user/create')}
                        label="Register / Sign In"
                        style={{ background: 'transparent', border: '1px solid #fff', color: '#fff' }}
                    />
                )
            ) : (
                <Button
                    icon="pi pi-bars"
                    style={iconButtonStyle}
                    onClick={(e) => mobileMenuRef.current?.toggle(e)}
                    aria-label="Menu"
                />
            )}

            <Menu ref={adminMenuRef} popup model={adminMenuItems} />
            <Menu ref={userMenuRef} popup model={userMenuItems} />
            <Menu ref={mobileMenuRef} popup model={mobileMenuItems} />
        </div>
    );

    return <Toolbar start={leftContents} end={rightContents} />;
};

export default Header;
