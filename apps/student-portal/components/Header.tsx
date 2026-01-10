'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useMediaQuery } from 'react-responsive';
import UserButton from '../app/login/UserButton';
import { useAuth } from '../app/login/useAuth';

const Header = () => {
    const [display, setDisplay] = useState(false);
    const isDefault = useMediaQuery({ minWidth: 600 });
    const router = useRouter();
    const { isLoggedIn, isAdmin } = useAuth();

    const leftContents = (
        <div
            className="flex items-center cursor-pointer p-toolbar-group-left"
            onClick={() => router.push('/')}
        >
            <Image
                src="https://www.mountainsol.org/wp-content/uploads/2023/07/Banner-4.png"
                alt="sol-logo"
                width={isDefault ? 218 : 153}
                height={isDefault ? 50 : 35}
                className="mr-2"
            />
            <h2 className="m-0">{isDefault ? 'Student Portal' : 'Portal'}</h2>
        </div>
    );

    const rightContents = (
        <div className="flex items-center gap-4">
            {isLoggedIn && isAdmin && (
                <Button
                    icon="pi pi-bars"
                    label="Menu"
                    onClick={() => setDisplay(true)}
                />
            )}
            <UserButton size={isDefault ? 'default' : 'small'} />
        </div>
    );

    return (
        <>
            <Toolbar start={leftContents} end={rightContents} />

            <Sidebar
                visible={display}
                position="right"
                onHide={() => setDisplay(false)}
            >
                <ul className="text-base">
                    <li>
                        <a
                            href="https://enrollment.mountainsol.org/classes/enrollment"
                            onClick={() => setDisplay(false)}
                        >
                            Class Registration
                        </a>
                    </li>
                    <h4 className="font-semibold mt-4 mb-1">Admin</h4>
                    <li>
                        <a
                            href="https://enrollment.mountainsol.org/admin"
                            onClick={() => setDisplay(false)}
                        >
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://enrollment.mountainsol.org/admin/classes/management"
                            onClick={() => setDisplay(false)}
                        >
                            Manage Classes
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://enrollment.mountainsol.org/admin/report"
                            onClick={() => setDisplay(false)}
                        >
                            Class Forms and Contacts
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://enrollment.mountainsol.org/admin/students"
                            onClick={() => setDisplay(false)}
                        >
                            Student Info Sheets
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://enrollment.mountainsol.org/admin/t-shirts"
                            onClick={() => setDisplay(false)}
                        >
                            T-shirt Sizes
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://enrollment.mountainsol.org/admin/enrollments"
                            onClick={() => setDisplay(false)}
                        >
                            Enrollments
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://enrollment.mountainsol.org/calendar/classes"
                            onClick={() => setDisplay(false)}
                        >
                            Class Calendar
                        </a>
                    </li>
                    <li>
                        <a href="/units" onClick={() => setDisplay(false)}>
                            Student Units
                        </a>
                    </li>
                </ul>
            </Sidebar>
        </>
    );
};

export default Header;
