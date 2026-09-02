import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
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
  size = 'medium',
  onChange: onChangeProp = null,
  readonly = false,
  readonlyBackgroundColor = '#dddddd',
  bold = false,
  freeSolo = false,
  ...props
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const { control, formState } = form
  const { errors } = formState
  const formValue = form.watch(name)

  // 1. Resolve localValue: find object in options or fallback to the raw string if freeSolo
  const localValue = React.useMemo(() => {
    if (formValue === null || formValue === undefined || formValue === '') {
      return null
    }
    const matched = options.find(
      option => option[valueKey] === formValue || option[labelKey] === formValue
    )
    if (matched) return matched
    // In freeSolo mode, allow raw string values
    return freeSolo ? formValue : null
  }, [formValue, options, valueKey, labelKey, freeSolo])


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
      render={({ field: { onChange, onBlur } }) => (
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
            value={
              typeof localValue === 'object' && localValue !== null
                ? localValue[labelKey]
                : localValue ?? ''
            }
            {...props}
          />
          :
          <Autocomplete
            value={localValue}
            required={required}
            freeSolo={freeSolo}
            options={options}
            size={size}
            noOptionsText={noOptionsText}
            getOptionLabel={(option) => {
              if (typeof option === 'string') return option
              return option?.[labelKey] ?? ''
            }}
            isOptionEqualToValue={(option, val) => {
              if (typeof val === 'string') {
                return option[labelKey] === val || option[valueKey] === val
              }
              return option[valueKey] === val?.[valueKey]
            }}
            onChange={(_, newValue) => {
              let outputValue = null
              if (typeof newValue === 'string') {
                outputValue = newValue
              } else if (newValue && typeof newValue === 'object') {
                outputValue = newValue[valueKey] ?? newValue[labelKey]
              }
              onChange(outputValue)
              if (onChangeProp) onChangeProp(outputValue)
            }}
            onInputChange={(_, newInputValue, reason) => {
              if (freeSolo && reason === 'input') {
                onChange(newInputValue)
                if (onChangeProp) onChangeProp(newInputValue)
              }
            }}
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
