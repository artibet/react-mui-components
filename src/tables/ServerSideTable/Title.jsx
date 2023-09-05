import { Typography } from '@mui/material'
import React from 'react'
import { TableContext } from './TableContext'

const Title = () => {

  const { props } = React.useContext(TableContext)

  return (
    <Typography variant='h5' sx={props.titleStyle}>{props.title}</Typography>
  )
}

export default Title  