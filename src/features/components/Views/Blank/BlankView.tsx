import React, { useEffect } from 'react';

import BlankPage from '@/features/pages/Blank';

import { usePageBreadcrumbs } from '@/features/components/Breadcrumbs/Breadcrumbs';

const BlankView = () => {
  const { setBreadcrumbs } = usePageBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: 'Blank Page',
        path: '/blank'
      }
    ]);
  }, [setBreadcrumbs]);

  return <BlankPage />;
};

export default BlankView;
