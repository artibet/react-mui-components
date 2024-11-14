import React from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { Controller } from 'react-hook-form'

export const MyCheckboxField = ({
  form,
  name,
  label,
  disabled = false,
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
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={(e) => form.setValue(name, e.target.checked)}
              disabled={disabled}
            />
          }
          label={label}
          {...props}
        />
      )}
    />
  )
}


