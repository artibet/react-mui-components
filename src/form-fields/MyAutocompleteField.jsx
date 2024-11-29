import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

export const MyAutocompleteField = ({
  form,
  name,
  label,
  required = false,
  disabled = false,
  options = [],
  valueKey = 'id',
  labelKey = 'label',
  maxLength = 255,
  autofocus = false,
  noOptionsText = 'Δεν υπάρχουν επιλογές',
  showErrors = true,
  ...props
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [localValue, setLocalValue] = React.useState(null)
  const formValue = form.watch(name)

  // ---------------------------------------------------------------------------------------
  // Update localValue on form value changed
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    setLocalValue(options.find(option => option[valueKey] === formValue) || null)
  }, [formValue])

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
        <Autocomplete
          value={localValue}
          required={required}
          onChange={(_, newValue) => onChange(newValue ? newValue[valueKey] : null)}
          options={options}
          isOptionEqualToValue={(option, value) => option[valueKey] === value[valueKey]}
          noOptionsText={noOptionsText}
          getOptionLabel={(option) => option[labelKey]}
          renderInput={
            (params) => (
              <TextField
                label={label}
                required={required}
                disabled={disabled}
                autoFocus={autofocus}
                inputProps={{ maxLength: maxLength }}
                error={showErrors && Boolean(errors[name]?.message)}
                onBlur={onBlur}
                variant="outlined"
                fullWidth={true}
                helperText={showErrors && errors[name]?.message}
                {...params}
                {...props}
              />
            )
          }
        />
      )}
    />
  )
}
