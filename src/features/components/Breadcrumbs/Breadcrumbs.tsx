import React from 'react';

import { Breadcrumbs as MuiBreadcrumbs, Typography, Link } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import {
  BreadcrumbProvider as ContextBreadcrumbProvider,
  useBreadcrumbs
} from '@/features/components/Breadcrumbs/useContext';

export { ContextBreadcrumbProvider as BreadcrumbProvider };

export const usePageBreadcrumbs = () => useBreadcrumbs();

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();

  if (!breadcrumbs.length) {
    return null;
  }

  return (
    <MuiBreadcrumbs sx={{ mb: 2 }}>
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return isLast ? (
          <Typography
            key={`${item.label}-${index}`}
            color="text.primary"
            fontWeight={600}
            fontSize={13}
          >
            {item.label}
          </Typography>
        ) : (
          <Link
            key={`${item.label}-${index}`}
            component={RouterLink}
            to={item.path || '#'}
            underline="hover"
            color="text.secondary"
            sx={{ fontSize: 13 }}
          >
            {item.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
