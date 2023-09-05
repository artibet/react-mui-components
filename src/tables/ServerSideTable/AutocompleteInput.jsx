import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

export const AutocompleteInput = ({
  value,
  options = [],
  valueKey = 'id',
  labelKey = 'label',
  onChange,
  placeholder = '',
  activeColor = '#D4F7F4', //#FFFEA2',
  inactiveColor = 'white',
  ...props
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [localValue, setLocalValue] = React.useState(null)

  // ---------------------------------------------------------------------------------------
  // Update localValue on value changed
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    setLocalValue(options.find(option => option[valueKey] === value) || null)
  }, [value])

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------

  return (
    <Autocomplete
      value={localValue}
      onChange={(event, newValue) => onChange(newValue ? newValue[valueKey] : null)}
      options={options}
      isOptionEqualToValue={(option, value) => option[valueKey] === value[valueKey]}
      noOptionsText='Δεν υπάρχουν επιλογές'
      size='small'
      renderInput={
        (params) => (
          <TextField
            variant="outlined"
            fullWidth={true}
            placeholder={placeholder}
            sx={{ backgroundColor: localValue !== null ? activeColor : inactiveColor, color: localValue == -1 ? '#cccccc' : '' }}
            size='small'
            {...params}
            {...props}
          />
        )
      }
    />
  )
}

