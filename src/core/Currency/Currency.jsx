import React from 'react'
import { Box } from '@mui/material'
import { formatCurrency } from '../../utils'

export const Currency = ({ amount, align = 'left' }) => {
  return (
    <Box sx={{ textAlign: align }}>
      {formatCurrency(amount)}
    </Box >
  )
}
