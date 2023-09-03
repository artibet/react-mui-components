import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import React from 'react'
import { ChromePicker } from 'react-color'
import { MyChip } from '../MyChip'
import './PickColorModalForm.css'

export const PickColorModalForm = ({
  show,
  onSubmit,
  onCancel,
  title = 'Επιλογή Χρώματος',
  color = '#000000',
  pickerWidth = 350,
  selectionTextColor = 'white',
  paddingY = '10px',
  paddingX = '10px',
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ',
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [localColor, setLocalColor] = React.useState('#000000')

  // ---------------------------------------------------------------------------------------
  // Reset localColor on color change value
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (show) {
      setLocalColor(color)
    }
  }, [show, color])

  // ---------------------------------------------------------------
  // submit on key down
  // ---------------------------------------------------------------
  const handleKeyDown = e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault()
      form.handleSubmit(onSubmit)()
    }
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Dialog open={show} onClose={() => { }} onKeyDown={handleKeyDown}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <MyChip
            color={selectionTextColor}
            backgroundColor={localColor}
            paddingX={paddingX}
            paddingY={paddingY}
            label={localColor} />
          <ChromePicker
            width={pickerWidth}
            color={localColor}
            onChange={(newColor) => setLocalColor(newColor.hex)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={() => onSubmit(localColor)}>{okLabel}</Button>
        <Button color='error' onClick={() => onCancel()}>{cancelLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}

