import React from 'react'
import { TableContext } from './TableContext'
import { Box, Collapse, TableCell, TableRow } from '@mui/material'
import RowActions from './RowActions'

export const Row = ({ row }) => {

  // ---------------------------------------------------------------------------------------
  // Context data and state
  // ---------------------------------------------------------------------------------------
  const { props, state } = React.useContext(TableContext)
  const [rowStyle, setRowStyle] = React.useState({})
  const [cellStyle, setCellStyle] = React.useState({})

  // Determine if this specific row is expanded
  const isExpanded = !!state.expandedRows[row.id]

  // ---------------------------------------------------------------------------------------
  // Init rowStyle
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    props.rowStyle && setRowStyle(props.rowStyle(row))
    props.cellStyle && setCellStyle(props.cellStyle(row))
  }, [row, props.rowStyle, props.cellStyle])

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <>
      <TableRow hover={props.rowsClickable} sx={{ cursor: props.rowsClickable ? 'pointer' : 'default', ...rowStyle }} onClick={() => props.onRowClick && props.onRowClick(row)}>
        {
          state.columns.map(column => (
            <TableCell key={column.id} sx={{ ...cellStyle, textAlign: column.align }} >
              {
                column.render
                  ? column.render(row)
                  : row[column.id]
              }
            </TableCell>
          ))
        }

        {props.rowActions.length > 0 && <RowActions row={row} />}
      </TableRow>

      {/* Expanded Content Row */}
      {props.expandableRows && (
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0, borderBottom: isExpanded ? undefined : 'none' }}
            colSpan={state.columns.length + (props.rowActions.length > 0 ? 1 : 0)}
          >
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {props.expandedRow && props.expandedRow(row)}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
