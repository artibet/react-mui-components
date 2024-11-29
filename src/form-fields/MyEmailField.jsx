import { TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

export const MyEmailField = ({
  form,
  name = 'email',
  label = 'E-mail',
  required = true,
  disabled = false,
  autofocus = false,
  showErrors = true,
  ...props
}) => {

  // ---------------------------------------------------------------------------------------
  // Destructure form fiels
  // ---------------------------------------------------------------------------------------
  const { control, formState } = form
  const { errors } = formState

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required,
        disabled: disabled
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          required={required}
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={showErrors && Boolean(errors[name]?.message)}
          fullWidth={true}
          helperText={showErrors && errors[name]?.message}
          variant="outlined"
          disabled={disabled}
          autoFocus={autofocus}
          {...props}
        />
      )}

    />
  )
}

