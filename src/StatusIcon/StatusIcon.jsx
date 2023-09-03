import React from 'react'
import { Done, Close } from '@mui/icons-material'


export const StatusIcon = ({ on, showOn = true, showOff = true, size = 24 }) => {
  if (Boolean(on)) {
    return showOn ? <Done color='success' sx={{ fontSize: size }} /> : null
  }
  else {
    return showOff ? <Close color='error' sx={{ fontSize: size }} /> : null
  }
}

