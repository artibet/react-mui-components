import React from 'react'
import { TableContext } from './TableContext'
import { TableCell, TableRow } from '@mui/material'
import ColumnTitle from './ColumnTitle'
import ColumnFilter from './ColumnFilter'

const TableHeader = () => {

  // ---------------------------------------------------------------------------------------
  // Context data
  // ---------------------------------------------------------------------------------------
  const { props, state } = React.useContext(TableContext)

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <>

      {/*itle and sorting icon  */}
      <TableRow>
        {
          state.columns.map(column => (
            <TableCell key={column.id} width={column.width} sx={{ minWidth: column.minWidth }}>
              <ColumnTitle column={column} />
            </TableCell>
          ))
        }

        {/* One extra column with no header if there are any rowAction */}
        {props.rowActions.length > 0 && <TableCell />}
      </TableRow>

      {/* Column filters */}
      {
        props.enableColumnFilters &&
        <TableRow >
          {
            state.columns.map(column => (
              <TableCell key={column.id}>
                {column.enableFilter
                  ? <ColumnFilter column={column} />
                  : null
                }
              </TableCell>
            ))
          }

          {/* One extra column with no header if there are any rowAction */}
          {props.rowActions.length > 0 && <TableCell />}
        </TableRow >
      }
    </>
  )
}

export default TableHeader