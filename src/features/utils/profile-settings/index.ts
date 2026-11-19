import React from 'react';
import { Person, Settings, Logout } from '@mui/icons-material';

export type SettingsItem = {
  name: string;
  icon: React.ReactNode;
  isLogout?: boolean;
};

export const SETTINGS: SettingsItem[] = [
  {
    name: 'My Profile',
    icon: React.createElement(Person, { fontSize: 'small' })
  },
  {
    name: 'Account Settings',
    icon: React.createElement(Settings, { fontSize: 'small' })
  },
  {
    name: 'Log out',
    icon: React.createElement(Logout, { fontSize: 'small' }),
    isLogout: true
  }
];
