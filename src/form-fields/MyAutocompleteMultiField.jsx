import { Autocomplete, Chip, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { objectInArray } from '../utils'

export const MyAutocompleteMultiField = ({
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
  const [localValue, setLocalValue] = React.useState([])
  const formValue = form.watch(name)

  // ---------------------------------------------------------------------------------------
  // Update localValue on form value changed
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    setLocalValue(options.filter(item => objectInArray(item, formValue)))
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
          multiple
          value={localValue}
          required={required}
          onChange={(_, newValue) => onChange(newValue)}
          options={options}
          isOptionEqualToValue={(option, value) => option[valueKey] === value[valueKey]}
          noOptionsText={noOptionsText}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant='outlined'
                label={option[labelKey]}
                size='small'
                {...getTagProps({ index })}
              />
            ))

          }
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
