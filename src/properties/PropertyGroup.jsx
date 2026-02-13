import { Box, List, Paper, Typography } from '@mui/material'

export const PropertyGroup = ({
  title,
  children,
  sx = {},
  titleBgColor = 'rgba(25, 118, 210, 0.08)',
  titleColor = 'primary.main',
  titleFontWeight = 'bold'
}) => {

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Paper variant="outlined" sx={{ mb: 3, overflow: 'hidden', ...sx, }}>
      <Box sx={{ px: 2, py: 1.5, bgcolor: titleBgColor }}>
        <Typography variant="subtitle2" color={titleColor} fontWeight={titleFontWeight}>
          {title}
        </Typography>
      </Box>
      <List disablePadding>
        {children}
      </List>
    </Paper>
  )
}
