import { Box } from '@mui/material'
import React from 'react'
import { TableContext } from './TableContext'
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/ti'

const ColumnTitle = ({ column }) => {

  // ---------------------------------------------------------------------------------------
  // Context data
  // ---------------------------------------------------------------------------------------
  const { props } = React.useContext(TableContext)
  const { api } = React.useContext(TableContext)

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <>
      <Box sx={{ dispaly: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, aligntItems: 'center', cursor: column.enableSorting ? 'pointer' : 'default', justifyContent: column.align === 'right' ? 'end' : (column.align === 'center' ? 'center' : 'start') }}
          onClick={column.enableSorting ? (e) => api.toggleSorting(e, column) : null}
        >
          <Box>{column.label}</Box>
          <Box>
            {
              column.enableSorting
                ?
                {
                  asc: <TiArrowSortedUp size={20} />,
                  desc: <TiArrowSortedDown size={20} />,
                }[api.getSortingStatus(column)] ?? <TiArrowUnsorted size={20} color="#cccccc" />
                :
                null  // getCanSort() == false 
            }
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ColumnTitle