import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import axios from 'axios'
import { Controller } from 'react-hook-form'
import { myDebounce } from '../utils'

export const MyAutocompleteApiField = ({
  form,
  name,
  label,
  optionsUrl,
  renderOption = null,
  valueKey = 'id',
  labelKey = 'label',
  minChars = 2,
  required = false,
  disabled = false,
  maxLength = 255,
  autofocus = false,
  loadingText = 'Ανάκτηση...',
  noOptionsText = 'Δεν υπάρχουν επιλογές',
  placeholder = '',
  size = 'medium',
  onChange: onChangeProp = null,
  ...props
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [localValue, setLocalValue] = React.useState(null)
  const [options, setOptions] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [inputText, setInputText] = React.useState('')

  // ---------------------------------------------------------------------------------------
  // Destructure form fiels
  // ---------------------------------------------------------------------------------------
  const { control, formState } = form
  const { errors } = formState

  const formValue = form.watch(name)

  // ---------------------------------------------------------------------------------------
  // Fetch option form existing value on mount
  // ---------------------------------------------------------------------------------------
  React.useState(() => {
    if (form.getValues(name)) {
      async function fetch() {
        setLoading(true)
        const response = await axios.get(`${optionsUrl}?id=${form.getValues(name)}`)
        setOptions(response.data)
        setLocalValue(response.data.find(option => option[valueKey] === form.getValues(name)) || null)
        setLoading(false)
      }
      fetch()
    }
  }, [])

  // ---------------------------------------------------------------------------------------
  // Input change handler
  // ---------------------------------------------------------------------------------------
  const handleInputChange = (_, newValue) => {
    setInputText(newValue)
    if (localValue && localValue.label !== newValue) {
      form.setValue(name, null)
      setLocalValue(null)
    }
    fetchOptions()
  }

  // ---------------------------------------------------------------------------------------
  // fetch function
  // ---------------------------------------------------------------------------------------
  const fetchOptions = async () => {

    // Fetch option for current selected value (if any)
    if (form.getValues(name)) {
      setLoading(true)
      const response = await axios.get(`${optionsUrl}?id=${form.getValues(name)}`)
      setOptions(response.data)
      setLoading(false)
    }
    else {
      if (inputText.length >= minChars) {
        setLoading(true)
        const response = await axios.get(`${optionsUrl}?token=${inputText}`)
        setOptions(response.data)
        setLoading(false)
      }
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
        <Autocomplete
          value={localValue}
          options={options}
          onInputChange={myDebounce(handleInputChange, 300)}
          onChange={(_, newValue) => {
            setLocalValue(newValue)
            onChange(newValue ? newValue[valueKey] : null)
            onChangeProp && (newValue ? onChangeProp(newValue[valueKey]) : onChangeProp(null))
          }}
          isOptionEqualToValue={(option, value) => option[valueKey] === value[valueKey]}
          getOptionLabel={(option) => option[labelKey]}
          filterOptions={x => x}
          noOptionsText={noOptionsText}
          loadingText={loadingText}
          loading={loading}
          required={required}
          size={size}
          renderInput={
            (params) => (
              <TextField
                label={label}
                required={required}
                disabled={disabled}
                autoFocus={autofocus}
                placeholder={placeholder}
                inputProps={{ maxLength: maxLength }}
                error={Boolean(errors[name]?.message)}
                onBlur={onBlur}
                variant="outlined"
                fullWidth={true}
                helperText={errors[name]?.message}
                size={size}
                {...params}
                {...props}
              />
            )
          }
          renderOption={
            (props, option, state) => (
              renderOption
                ?
                renderOption(props, option, state)
                :
                <li {...props} key={option[valueKey]}>
                  {option[labelKey]}
                </li>
            )
          }
        />
      )}
    />
  )
}
