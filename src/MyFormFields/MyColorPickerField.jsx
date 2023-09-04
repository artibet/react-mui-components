import { Box, Popover, Stack, Typography } from '@mui/material'
import React from 'react'
import { ChromePicker } from 'react-color'
import { Controller } from 'react-hook-form'
import { MyChip } from '../core/MyChip'

export const MyColorPickerField = ({
  form,
  name = 'color',
  label = 'Επιλογή Χρώματος',
  selectionWidth = 70,
  pickerWidth = 350,
  selectionTextColor = 'white',
  paddingY = '10px',
  paddingX = '10px',
  required = false,
  disabled = false,
  ...props
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [anchor, setAnchor] = React.useState(null)
  const showPicker = Boolean(anchor)
  const id = showPicker ? 'color-picker' : undefined

  // ---------------------------------------------------------------------------------------
  // Destructure form fiels
  // ---------------------------------------------------------------------------------------
  const { control } = form

  // ---------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        disabled: disabled
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Stack gap={1} {...props}>
          <Typography>{`${label} ${required ? '*' : ''}`}</Typography>
          <Box sx={{ display: 'flex' }}>
            <Box aria-describedby={id} sx={{ cursor: 'pointer' }} onClick={(e) => setAnchor(e.currentTarget)}>
              <MyChip color={selectionTextColor} backgroundColor={value} paddingY={paddingY} paddingX={paddingX} width={selectionWidth} label={value} />
            </Box>
          </Box>
          <Popover
            sx={{ marginTop: '10px' }}
            id={id}
            open={showPicker}
            anchorEl={anchor}
            onClose={() => setAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Box>
              <ChromePicker width={pickerWidth} color={value} onChange={(newColor) => onChange(newColor.hex)} />
            </Box>
          </Popover>
        </Stack >
      )}
    />
  )

}

