import React, { useMemo } from 'react'
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
  readonlyBackgroundColor = '#dddddd',
  bold = false,
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
    const currentValue = form.getValues(name);
    if (currentValue) {
      async function fetch() {
        setLoading(true)
        const response = await axios.get(`${optionsUrl}?id=${form.getValues(name)}`)
        setOptions(response.data)
        setLocalValue(response.data.find(option => option[valueKey] === form.getValues(name)) || null)
        setLoading(false)
      }
      fetch()
    }
  }, [optionsUrl, name, valueKey])

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
  const handleInputChange = (event, value, reason) => {
    if (reason === 'input') {
      // Regular typing gets throttled
      debouncedFetch(form.getValues(name), value);
    } else if (reason === 'clear') {
      // Instant execution bypass on clean events
      setOptions([]);
    }
  };

  // ---------------------------------------------------------------------------------------
  // Debounced API Search for Typing
  // ---------------------------------------------------------------------------------------
  const debouncedFetch = useMemo(
    () => myDebounce((currentId, token) => {
      fetchOptions(currentId, token);
    }, 300),
    [optionsUrl, minChars]
  );

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
            value={localValue ? localValue[labelKey] : ''}
          />
          :
          <Autocomplete
            value={localValue}
            options={options}
            onInputChange={handleInputChange}
            onChange={(_, newValue) => {
              setLocalValue(newValue);
              const outputValue = newValue ? newValue[valueKey] : null;
              onChange(outputValue);
              if (onChangeProp) {
                onChangeProp(outputValue);
              }
              // If cleared out entirely, reset options state context immediately
              if (!newValue) {
                setOptions([]);
              }
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
                  error={showErrors && Boolean(errors[name]?.message)}
                  onBlur={onBlur}
                  variant="outlined"
                  fullWidth={true}
                  helperText={showErrors && errors[name]?.message}
                  size={size}
                  maxLength={maxLength}
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
