import React from 'react'
import { CalendarToday, Update } from '@mui/icons-material'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { formatDateTime } from '../../utils'

export const PageHeader = ({
  title,
  titleVariant = 'h5',
  titleFontWeight = 800,
  titleColor = 'text.primary',
  wrapperStyle = {},
  titleChip = null,
  createdAt = null,
  updatedAt = null,
  timestamps = null,
  globalActions = null,

}) => {

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Box sx={{ ...wrapperStyle }}>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{ mt: 2 }}
        spacing={3}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
      >

        <Stack direction="row" spacing={3} alignItems="center">
          <Box>
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" sx={{ mb: 0.5 }}>
              <Typography variant={titleVariant} sx={{ fontWeight: titleFontWeight, color: titleColor }}>
                {title}
              </Typography>
              {titleChip}
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              divider={<Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled', opacity: 0.5 }} />}
            >
              {
                (createdAt || updatedAt) &&
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ display: 'flex' }} // Εξασφαλίζει το flex behavior
                >
                  {/* createdAT */}
                  {
                    createdAt &&
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarToday sx={{ fontSize: 14, color: 'text.disabled' }} />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ lineHeight: 1, display: 'flex', alignItems: 'center' }}
                      >
                        {formatDateTime(timestamps.created_at)}
                      </Typography>
                    </Box>
                  }

                  {/* devider */}
                  {
                    createdAt && updatedAt &&
                    <Box component="span" sx={{ color: 'divider', fontSize: 14 }}>•</Box>
                  }

                  {/* updatedAT */}
                  {
                    updatedAt &&
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Update sx={{ fontSize: 14, color: 'text.disabled' }} />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ lineHeight: 1, display: 'flex', alignItems: 'center' }}
                      >
                        {formatDateTime(timestamps.updated_at)}
                      </Typography>
                    </Box>
                  }

                </Stack>
              }
            </Stack>
          </Box>
        </Stack>

        {/* Global Actions */}
        <Box sx={{ alignSelf: { xs: 'flex-end', md: 'center' } }}>
          {globalActions}
        </Box>

      </Stack>

      <Divider sx={{ mt: 2, opacity: 1 }} />

    </Box>
  )
}
