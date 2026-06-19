import { FormControlLabel, FormGroup, Switch, Typography } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

export const MySwitchField = ({
  form,
  name,
  label,
  disabled = false,
  color = 'primary',
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
      render={({ field: { onChange, onBlur, value } }) => {
        const isChecked = Boolean(value)

        let labelColor = 'text.primary';
        if (disabled) {
          labelColor = 'text.disabled';
        } else if (isChecked) {
          labelColor = `${color}.main`;
        }

        return (
          <FormGroup {...props}>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(value)}
                  onChange={(e) => form.setValue(name, e.target.checked)}
                  inputProps={{ 'aria-label': label }}
                  disabled={disabled}
                  color={color}
                />
              }
              label={
                <Typography sx={{ color: labelColor, transition: 'color 0.2s ease' }}>
                  {label}
                </Typography>
              }
            />
          </FormGroup >
        )
      }}
    />
  )

}


