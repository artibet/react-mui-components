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

  // ---------------------------------------------------------------------------------------
  // click handler
  // ---------------------------------------------------------------------------------------
  const handleClick = e => {
    e.currentTarget.blur()
    props.onCreateRow(e)
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Tooltip title={props.createButtonTooltip} arrow={true} placement='top'>
      <Button
        variant={props.createButtonVariant}
        onClick={handleClick}
      >
        <MdOutlineAdd size={24} />
      </Button>
    </Tooltip>
  )
}

export default CreateButton