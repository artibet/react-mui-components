import React from 'react'
import { RadioGroup, Radio, FormControlLabel, FormControl, FormLabel } from '@mui/material'
import { Controller } from 'react-hook-form'

export const MyRadioField = ({
  form,
  name,
  label,
  options,
  disabled = false,
  direction = 'vertical',
  ...props
}) => {

  // ---------------------------------------------------------------------------------------
  // Destructure form fiels
  // ---------------------------------------------------------------------------------------
  const { control } = form

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        disabled: disabled
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl {...props}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            row={direction === 'horizontal'}
            value={value}
            onChange={(e) => form.setValue(name, e.target.value)}>
            {
              options.map(option => (
                <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.label} />
              ))
            }
          </RadioGroup>
        </FormControl>
      )}
    />
  )
}


