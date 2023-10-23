import React from 'react'
import { Box, Paper } from '@mui/material'

export const IconCard = ({
  icon,
  title = '',
  subtitle = '',
  backgroundColor = 'white',
  elevation = 2,
  iconBackgroundColor = 'gray',
  iconColor = 'white',
  width = '100%',
  onClick = null
}) => {

  // ---------------------------------------------------------------------------------------
  // Styles
  // ---------------------------------------------------------------------------------------
  const styles = {
    paper: {
      backgroundColor: backgroundColor,
      width: width,
      cursor: onClick ? 'pointer' : 'default'
    },
    wrapperBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'start',
      gap: 2
    },
    iconBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      color: iconColor,
      backgroundColor: iconBackgroundColor,
      padding: 0,
      margin: 0,
      width: '72px',
      height: '72px',
      fontSize: '48px',

    },
    contentBox: {
      display: 'flex',
      paddingRight: '15px',
      flexDirection: 'column',

    }
  }

  // ---------------------------------------------------------------------------------------
  // Click handler
  // ---------------------------------------------------------------------------------------
  const handleClick = () => {
    onClick && onClick()
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Paper elevation={elevation} sx={styles.paper} square onClick={handleClick}>
      <Box sx={styles.wrapperBox}>
        <Box sx={styles.iconBox}>
          {icon}
        </Box>
        <Box sx={styles.contentBox}>
          <Box>
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

