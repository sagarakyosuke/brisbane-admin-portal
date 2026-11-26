import { RouteObject, Navigate } from 'react-router-dom';

import Layout from '@/features/components/Layout';

import LoginView from '@/features/components/Views/Authentication/LoginView';
import MaintenanceView from '@/features/components/Views/Maintenance/MaintenanceView';
import ManagePostsView from '@/features/components/Views/ManagePosts/ManagePostsView';
import BlankView from '@/features/components/Views/Blank/BlankView';
import ToolkitsView from '@/features/components/Views/Toolkits/ToolkitsView';

const routes: RouteObject[] = [
  // Authentication routes - outside the main Layout
  {
    path: '/login',
    element: <LoginView />
  },

  // Main application routes - inside the dashboard Layout
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <MaintenanceView />
      },
      {
        path: 'manage-post',
        element: <ManagePostsView />
      },
      {
        path: 'maintenance',
        element: <MaintenanceView />
      },
      {
        path: 'blank',
        element: <BlankView />
      },
      {
        path: 'toolkits',
        element: <ToolkitsView />
      }
    ]
  },

  // Unknown routes
  {
    path: '*',
    element: <Navigate to="/login" replace />
  }
];

export default routes;
