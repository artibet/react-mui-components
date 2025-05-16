import React from 'react'
import { TableContext } from './TableContext'
import { TableCell, TableFooter, TableRow } from '@mui/material'
import { formatCurrency } from '../../utils'

const Footer = () => {

  // ---------------------------------------------------------------------------------------
  // State nand context
  // ---------------------------------------------------------------------------------------
  const { state } = React.useContext(TableContext)

  // ---------------------------------------------------------------------------------------
  // 
  // ---------------------------------------------------------------------------------------
  const columnFooter = (column) => {
    state.data?.footer.find()
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  if (!state.data?.footer || Object.keys(state.data?.footer).length == 0) return null

  return (
    <TableFooter>
      <TableRow>
        {
          state?.columns.map(column => (
            <TableCell key={column.id} align='right' sx={{ fontWeight: 'bold', fontSize: 14 }}>
              {
                state.data?.footer[column.id]
              }
            </TableCell>
          ))
        }
      </TableRow>
    </TableFooter>
  )
}

export default Footer