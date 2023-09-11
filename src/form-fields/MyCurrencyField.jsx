import React from 'react'
import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import NumberFormat from 'react-number-format'


export const MyCurrencyField = ({
  form,
  name,
  label,
  required = false,
  disabled = false,
  autofocus = false,
  ...props
}) => {

  // ---------------------------------------------------------------------------------------
  // Destructure form fiels
  // ---------------------------------------------------------------------------------------
  const { control, formState } = form
  const { errors } = formState

  // ---------------------------------------------------------------------------------------
  // handle value change
  // ---------------------------------------------------------------------------------------
  const handleChange = (values, sourceInfo) => {
    if (values.value === '') {
      form.setValue(name, null)
    }
    else {
      form.setValue(name, values.floatValue)
    }
  }

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
        <NumberFormat
          customInput={TextField}
          variant="outlined"
          label={label}
          required={required}
          disabled={disabled}
          value={value}
          thousandSeparator='.'
          decimalSeparator=','
          decimalScale={2}
          fixedDecimalScale={true}
          allowNegative={false}
          onValueChange={handleChange}
          error={Boolean(errors[name]?.message)}
          helperText={errors[name]?.message}
          {...props}
        />
      )}

    />
  )
}

