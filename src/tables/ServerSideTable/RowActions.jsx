import { Box, TableCell } from '@mui/material'
import React from 'react'
import { TableContext } from './TableContext'

const RowActions = ({ row }) => {

  // ---------------------------------------------------------------------------------------
  // Context data
  // ---------------------------------------------------------------------------------------
  const { props } = React.useContext(TableContext)

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  if (!props.rowActions) return null

  return (
    <TableCell>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {
          props.rowActions.map((action, index) => {
            return <Box key={index}>{action(row)}</Box>
          })
        }
      </Box>
    </TableCell >
  )
}

export default RowActions