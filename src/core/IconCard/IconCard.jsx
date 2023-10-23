import React from 'react'
import { Box, Paper } from '@mui/material'

export const IconCard = ({
  icon,
  title = '',
  subtitle = '',
  backgroundColor = 'white',
  elevation = 2,
  iconBackgroundColor = 'white',
  iconPadding = '15px',
}) => {

  // ---------------------------------------------------------------------------------------
  // Styles
  // ---------------------------------------------------------------------------------------
  const styles = {
    paper: {
      backgroundColor: backgroundColor,
    },
    wrapperBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      gap: 1
    },
    iconBox: {
      backgroundColor: iconBackgroundColor,
      padding: iconPadding,
      display: 'inline-block'
    },
    contentBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }
  }
  return (
    <Paper elevation={elevation} sx={styles.paper} square>
      <Box sx={styles.wrapperBox}>
        <Box sx={styles.iconBox}>
          {icon}
        </Box>
        <Box sx={styles.contentBox}>
          <Box sx={{ marginTop: '3px' }}>
            {title}
          </Box>
          <Box>
            {subtitle}
          </Box>
        </Box>
      </Box>

    </Paper>
  )
}

