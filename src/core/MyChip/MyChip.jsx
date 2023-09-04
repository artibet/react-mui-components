import React from 'react'
import { Typography } from '@mui/material'

export const MyChip = ({
  label = '',
  color = 'white',
  backgroundColor = '#888888',
  paddingX = '10px',
  paddingY = '5px',
  borderRadius = '10px',
  fontSize = '14px',
  width = 'auto',
}) => {

  // ---------------------------------------------------------------------------------------
  // Chip style
  // ---------------------------------------------------------------------------------------
  const styles = {
    text: {
      display: 'inline-block',
      textAlign: 'center',
      backgroundColor: backgroundColor,
      paddingX: paddingX,
      paddingY: paddingY,
      borderRadius: borderRadius,
      width: width,
      color: color,
      fontSize: fontSize,
    }
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Typography sx={styles.text}>{label}</Typography>
  )
}
