import React from 'react'
import { TableContext } from './TableContext'
import { Box } from '@mui/material'

const GlobalActions = () => {

  // ---------------------------------------------------------------------------------------
  // Context data
  // ---------------------------------------------------------------------------------------
  const { props } = React.useContext(TableContext)

  if (!props.globalActions) return null

  return (
    <>
      {
        props.globalActions.map((action, index) => <Box key={index}>{action}</Box>)
      }
    </>
  )
}

export default GlobalActions