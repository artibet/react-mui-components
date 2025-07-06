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
  size = 'small',
  readonly = false,
  readonlyBackgroundColor = '#dddddd',
  bold = false,
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
        readonly
          ?
          <TextField
            size={size}
            label={label}
            fullWidth={true}
            required={required}
            slotProps={{
              input: {
                maxLength: maxLength,
                readOnly: readonly,
                sx: { fontWeight: bold ? 'bold' : '', backgroundColor: readonly ? readonlyBackgroundColor : '' }
              }
            }}
            value={localValue ? localValue.label : ''}
          />
          :
          <Autocomplete
            value={localValue}
            required={required}
            onChange={(_, newValue) => onChange(newValue ? newValue[valueKey] : null)}
            options={options}
            isOptionEqualToValue={(option, value) => option[valueKey] === value[valueKey]}
            noOptionsText={noOptionsText}
            getOptionLabel={(option) => option[labelKey]}
            size={size}
            slotProps={{
              input: {
                maxLength: maxLength,
                sx: { fontWeight: bold ? 'bold' : '', color: 'red' }
              }
            }}
            renderInput={
              (params) => (
                <TextField
                  label={label}
                  required={required}
                  disabled={disabled}
                  autoFocus={autofocus}
                  size={size}
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
