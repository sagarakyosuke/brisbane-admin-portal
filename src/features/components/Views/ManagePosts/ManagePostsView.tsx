import React, { useEffect } from 'react';

import ManagePostsPage from '@/features/pages/ManagePosts';

import { usePageBreadcrumbs } from '@/features/components/Breadcrumbs/Breadcrumbs';

const ManagePostsView = () => {
  const { setBreadcrumbs } = usePageBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: 'Manage Posts',
        path: '/manage-post'
      }
    ]);
  }, [setBreadcrumbs]);

  return <ManagePostsPage />;
};

export default ManagePostsView;
