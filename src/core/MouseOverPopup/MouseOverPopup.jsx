import { Popover } from '@mui/material'
import React from 'react'

// Expects one and only one child
// popup is a react component to be shown on mouse over
export const MouseOverPopup = ({
  popup,
  children,
  verticalAnchor = 'bottom',
  horizontalAnchor = 'left',
  verticalTransform = 'top',
  horizontalTransform = 'left',
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  // ---------------------------------------------------------------------------------------
  // Open popup handler
  // ---------------------------------------------------------------------------------------
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // ---------------------------------------------------------------------------------------
  // Close popup handler
  // ---------------------------------------------------------------------------------------
  const handleClose = () => {
    setAnchorEl(null)
  }

  // ---------------------------------------------------------------------------------------
  // Augment first child with open and close handlers
  // ---------------------------------------------------------------------------------------
  const child = children ? React.cloneElement(children, { onMouseEnter: handleOpen, onMouseLeave: handleClose }) : null

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <>
      {child}
      <Popover
        id='mouse-over-popup'
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: verticalAnchor,
          horizontal: horizontalAnchor,
        }}
        transformOrigin={{
          vertical: verticalTransform,
          horizontal: horizontalTransform,
        }}
        onClose={handleClose}
        disableRestoreFocus
      >
        {popup}
      </Popover>
    </>
  )
}
