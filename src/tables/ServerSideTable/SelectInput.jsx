import React from 'react'
import { IconButton, InputAdornment, MenuItem, Select } from '@mui/material'
import { MdClear } from 'react-icons/md'

export const SelectInput = ({
  value,
  options,
  onChange,
  valueKey = 'id',
  labelKey = 'label',
  placeholder = '',
  activeColor = '#D4F7F4', //#FFFEA2',
  inactiveColor = 'white',
  clearIcon = true,
}) => {

  // ---------------------------------------------------------------------------------------
  // Local state
  // ---------------------------------------------------------------------------------------
  const [localValue, setLocalValue] = React.useState(-1)

  // ---------------------------------------------------------------------------------------
  // Track value changes and update localValue
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (value === null || value === '') {
      setLocalValue(-1)
    }
    else {
      setLocalValue(value)
    }
  }, [value])

  // ---------------------------------------------------------------------------------------
  // Handle selection change if not -1 
  // ---------------------------------------------------------------------------------------
  const handleChange = (e) => {
    const newValue = e.target.value
    if (newValue !== -1) {
      onChange(newValue)
    }
    else {
      onChange('')
    }
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Select
      sx={{ backgroundColor: localValue !== -1 ? activeColor : inactiveColor, color: localValue == -1 ? '#cccccc' : '' }}
      value={localValue}
      fullWidth={true}
      onChange={handleChange}
      size='small'
      endAdornment={clearIcon &&
        <InputAdornment position='end' disablePointerEvents={value === null}>
          <IconButton onClick={() => onChange('')} >
            {localValue !== -1 ? <MdClear /> : <MdClear color='#cccccc' />}
          </IconButton>
        </InputAdornment >
      }
    >
      <MenuItem value={-1}>{placeholder}</MenuItem>
      {
        options.map(option => (
          <MenuItem key={option[valueKey]} value={option[valueKey]} >
            {option[labelKey]}
          </MenuItem>
        ))
      }
    </Select >
  )
}
