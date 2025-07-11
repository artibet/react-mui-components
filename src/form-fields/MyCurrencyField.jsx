import React from 'react'
import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'


export const MyCurrencyField = ({
  form,
  name,
  label,
  required = false,
  disabled = false,
  autofocus = false,
  showErrors = true,
  readonly = false,
  readonlyBackgroundColor = '#dddddd',
  bold = false,
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
        <NumericFormat
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
          error={showErrors && Boolean(errors[name]?.message)}
          helperText={showErrors && errors[name]?.message}
          fullWidth
          slotProps={{
            input: {
              readOnly: readonly,
              sx: { fontWeight: bold ? 'bold' : '', backgroundColor: readonly ? readonlyBackgroundColor : '' }
            }
          }}
          {...props}
        />
      )}

    />
  )
}

