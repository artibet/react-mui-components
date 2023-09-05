import React from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { MdClear } from 'react-icons/md'
import InputMask from 'react-input-mask'

export const IntegerInput = ({
  initialValue,
  mask = '999999',
  onChange,
  placeholder = '',
  activeColor = '#D4F7F4', //#FFFEA2',
  inactiveColor = 'white',
  clearIcon = true,
}) => {

  // ---------------------------------------------------------------------------------------
  // Local state - keep value
  // ---------------------------------------------------------------------------------------
  const [value, setValue] = React.useState(initialValue)

  // ---------------------------------------------------------------------------------------
  // When initial value changes set to local value
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = e => {
    setValue((old) => {
      if (old === e.target.value) {
        return old
      }
      else {
        onChange(e.target.value)
        return e.target.value
      }
    })
  }

  return (
    <InputMask
      mask={mask}
      value={value}
      onChange={handleChange}
      maskChar=''
    >
      {
        () =>
          <TextField
            sx={{ backgroundColor: value ? activeColor : inactiveColor }}
            placeholder={placeholder}
            fullWidth={true}
            size='small'
            InputProps={{
              endAdornment: clearIcon && (
                <InputAdornment position="end" disablePointerEvents={!value}>
                  <IconButton onClick={() => onChange('')} >
                    {value ? <MdClear /> : <MdClear color='#cccccc' />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
      }
    </InputMask >
  )
}
