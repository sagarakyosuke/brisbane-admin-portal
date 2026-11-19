import React from 'react';
import { Dashboard, PostAdd } from '@mui/icons-material';

export type SidebarMenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: React.createElement(Dashboard, { fontSize: 'small' })
  },
  {
    name: 'Manage Post',
    path: '/manage-post',
    icon: React.createElement(PostAdd, { fontSize: 'small' })
  }
];
