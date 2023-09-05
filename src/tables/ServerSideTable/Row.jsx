import React from 'react'
import { TableContext } from './TableContext'
import { TableCell, TableRow } from '@mui/material'
import RowActions from './RowActions'

export const Row = ({ row }) => {

  // ---------------------------------------------------------------------------------------
  // Context data and state
  // ---------------------------------------------------------------------------------------
  const { props, state } = React.useContext(TableContext)
  const [rowStyle, setRowStyle] = React.useState({})
  const [cellStyle, setCellStyle] = React.useState({})

  // ---------------------------------------------------------------------------------------
  // Init rowStyle
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    props.rowStyle && setRowStyle(props.rowStyle(row))
    props.cellStyle && setCellStyle(props.cellStyle(row))
  }, [row])

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <TableRow hover={props.rowsClickable} sx={{ cursor: props.rowsClickable ? 'pointer' : 'default', ...rowStyle }} onClick={() => props.onRowClick && props.onRowClick(row)}>
      {
        state.columns.map(column => (
          <TableCell key={column.id} sx={{ ...cellStyle }} >
            {
              column.render
                ? column.render(row)
                : row[column.id]
            }
          </TableCell>
        ))
      }

      {props.rowActions.length > 0 && <RowActions row={row} />}
    </TableRow >
  )
}
