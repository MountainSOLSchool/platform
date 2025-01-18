import React, { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useRouter } from 'next/navigation';
import { useAuth } from './UseAuth';

interface UserButtonProps {
    size?: 'default' | 'small';
}

export default function UserButton({ size = 'default' }: UserButtonProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = React.useRef<Menu>(null);
    const router = useRouter();
    const { user, signOut } = useAuth();

    const menuItems = user
        ? [
              {
                  label: user.email
                      ? user.email.length > 15
                          ? user.email.substring(0, 15) + '...'
                          : user.email
                      : 'User email',
                  disabled: true,
              },
              {
                  label: 'Sign Out',
                  icon: 'pi pi-sign-out',
                  command: () => signOut(),
              },
          ]
        : [];

    if (!user) {
        return (
            <Button
                onClick={() => router.push('/user/create')}
                label={size === 'default' ? 'Register / Sign In' : 'Account'}
                className="p-button-md"
            />
        );
    }

    return (
        <div className="cursor-pointer">
            <Avatar
                size="large"
                icon="pi pi-user"
                onClick={(e) => menuRef.current?.toggle(e)}
                className="mr-2"
                style={{
                    backgroundColor: '#aaa',
                    color: '#ffffff',
                }}
            />
            <Menu
                ref={menuRef}
                popup
                model={menuItems}
                onShow={() => setMenuVisible(true)}
                onHide={() => setMenuVisible(false)}
            />
        </div>
    );
}
