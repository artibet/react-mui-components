import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

export const MessageDialog = ({
  open,
  title,
  message,
  onClose,
  closeText = 'ΟΚ'
}) => {

  // ---------------------------------------------------------------------------------------
  // cancel handler
  // ---------------------------------------------------------------------------------------
  const handleClose = e => {
    e.stopPropagation()
    onClose()
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Dialog
      open={open}
      onClose={() => { }}    // Prevent closing on backdrop click and esc
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>{closeText}</Button>
      </DialogActions>
    </Dialog>
  )
}


