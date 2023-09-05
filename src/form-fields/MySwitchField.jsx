import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

export const MySwitchField = ({
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
        <FormGroup {...props}>
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(value)}
                onChange={(e) => form.setValue(name, e.target.checked)}
                inputProps={{ 'aria-label': label }}
              />
            }
            label={label}
          />
        </FormGroup >
      )}
    />
  )

}


