import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Typography, Link, Box } from '@mui/material';
import { usePage, Link as InertiaLink } from '@inertiajs/react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const Breadcrumbs = () => {

  // ---------------------------------------------------------------------------------------
  // State - pull breadcrumbs from page props if any
  // ---------------------------------------------------------------------------------------
  const { breadcrumbs } = usePage().props

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------

  // If no breadcrumbs on the page return null
  if (!breadcrumbs || breadcrumbs.length === 0) return null

  // Return the breadcrumbs
  return (
    <Box sx={{ mb: 3 }}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return isLast ? (
            <Typography
              key={index}
              variant="body2"
              sx={{ fontWeight: 700, color: 'text.primary' }}
            >
              {item.label}
            </Typography>
          ) : (
            <Link
              key={index}
              component={InertiaLink}
              href={item.url}
              underline="hover"
              variant="body2"
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              {item.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  )
}
