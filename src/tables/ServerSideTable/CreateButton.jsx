import { Button, Tooltip } from '@mui/material'
import React from 'react'
import { MdOutlineAdd } from 'react-icons/md'
import { TableContext } from './TableContext'

const CreateButton = () => {

  // ---------------------------------------------------------------------------------------
  // Context data
  // ---------------------------------------------------------------------------------------
  const { props } = React.useContext(TableContext)


  if (!props.enableCreateRow) return null

  return (
    <Tooltip title={props.createButtonTooltip} arrow={true} placement='top'>
      <Button
        variant={props.createButtonVariant}
        color="success" onClick={() => props.onCreateRow()}>
        <MdOutlineAdd size={24} />
      </Button>
    </Tooltip>
  )
}

export default CreateButton