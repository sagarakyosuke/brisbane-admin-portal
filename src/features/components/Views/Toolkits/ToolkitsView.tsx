import React, { useEffect } from 'react';

import ToolkitsPage from '@/features/pages/Toolkits';

import { usePageBreadcrumbs } from '@/features/components/Breadcrumbs/Breadcrumbs';

const ToolkitsView = () => {
  const { setBreadcrumbs } = usePageBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: 'Toolkits',
        path: '/toolkits'
      }
    ]);
  }, [setBreadcrumbs]);

  return <ToolkitsPage />;
};

export default ToolkitsView;
