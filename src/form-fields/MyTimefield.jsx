import React from 'react'
import { TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers'
import el from 'date-fns/locale/el'
import { Controller } from 'react-hook-form'

export const MyTimeField = ({
  form,
  name,
  label,
  required = false,
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
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={el}>
          <TimePicker
            label={label}
            inputFormat="HH:mm"
            value={value}
            onChange={onChange}
            disabled={disabled}
            renderInput={(params) =>
              <TextField {...params}
                required={required}
                error={showErrors && Boolean(errors[name]?.message)}
                helperText={showErrors && errors[name]?.message}
                variant="outlined"
                fullWidth={true}
                {...props}
              />}
          />
        </LocalizationProvider>
      )}

    />
  )
}

