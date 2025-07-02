import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import axios from 'axios'
import { Controller } from 'react-hook-form'
import { myDebounce } from '../utils'

// ---------------------------------------------------------------------------------------
// Non-state variable for synchronous update
// ---------------------------------------------------------------------------------------
// var inputText = ''

export const MyAutocompleteApiField = React.forwardRef(({
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
  showErrors = true,
  readonly = false,
  ...props
}, ref) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [localValue, setLocalValue] = React.useState(null)
  const [options, setOptions] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  // ---------------------------------------------------------------------------------------
  // Ref callbacks
  // ---------------------------------------------------------------------------------------
  React.useImperativeHandle(ref, () => ({
    setValue: newValue => {
      form.setValue(name, newValue)
      async function fetch() {
        setLoading(true)
        const response = await axios.get(`${optionsUrl}?id=${newValue}`)
        setOptions(response.data)
        setLocalValue(response.data.find(option => option[valueKey] === form.getValues(name)) || null)
        setLoading(false)
      }
      fetch()
    }
  }))

  // ---------------------------------------------------------------------------------------
  // Destructure form fiels
  // ---------------------------------------------------------------------------------------
  const { control, formState } = form
  const { errors } = formState

  // ---------------------------------------------------------------------------------------
  // Fetch option form existing value on mount
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
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
  // fetch function
  // ---------------------------------------------------------------------------------------
  const fetchOptions = async (id, token) => {
    if (!token) setOptions([])
    if (token.length < minChars) return
    setLoading(true)
    const response = await axios.get(`${optionsUrl}?id=${id ? id : ''}&token=${token ? token : ''}`)
    setOptions(response.data)
    setLoading(false)
  }

  // ---------------------------------------------------------------------------------------
  // Input change handler
  // ---------------------------------------------------------------------------------------
  const handleInputChange = (_, newValue) => {
    fetchOptions(form.getValues(name), newValue)
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
        readonly
          ?
          <TextField
            size={size}
            label={label}
            fullWidth={true}
            required={required}
            disabled={readonly}
            value={localValue ? localValue.label : ''}
          />
          :
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
                  error={showErrors && Boolean(errors[name]?.message)}
                  onBlur={onBlur}
                  variant="outlined"
                  fullWidth={true}
                  helperText={showErrors && errors[name]?.message}
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
})
