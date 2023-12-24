import React from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { Clear } from '@mui/icons-material'

export const MyUploadField = ({
  form,
  name,
  label,
  required = false,
  disabled = false,
  ...props
}) => {

  // ---------------------------------------------------------------------------------------
  // Local state and ref
  // ---------------------------------------------------------------------------------------
  const [file, setFile] = React.useState()
  const inputFileRef = React.useRef(null)

  // ---------------------------------------------------------------------------------------
  // Destructure form fiels
  // ---------------------------------------------------------------------------------------
  const { control, formState } = form
  const { errors } = formState

  // ---------------------------------------------------------------------------------------
  // handle button clicked for select file
  // ---------------------------------------------------------------------------------------
  const handleSelectFile = () => {
    inputFileRef.current.value = null
    inputFileRef.current.click()
  }

  // ---------------------------------------------------------------------------------------
  // handle file selection change
  // ---------------------------------------------------------------------------------------
  const handleChange = file => {
    setFile(file)
    form.setValue(name, file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  // ---------------------------------------------------------------------------------------
  // Clear selected file
  // ---------------------------------------------------------------------------------------
  const handleClear = (e) => {
    e.stopPropagation()
    setFile(null)
    form.setValue(name, null)
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required,
          disabled: disabled,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            sx={{ input: { cursor: 'pointer' } }}
            onClick={handleSelectFile}
            required={required}
            label={label}
            value={file ? file.name : ''}
            // onChange={onChange}
            // onBlur={onBlur}
            error={Boolean(errors[name]?.message)}
            fullWidth={true}
            helperText={errors[name]?.message}
            variant="outlined"
            disabled={disabled}
            InputProps={{
              endAdornment: file && <InputAdornment position="end"><IconButton onClick={e => handleClear(e)}><Clear /></IconButton></InputAdornment>,
              readOnly: true
            }}
            {...props}
          />
        )}
      />
      {/* Hidden form to submit file */}
      <input type='file' ref={inputFileRef} style={{ display: 'none' }
      } onChange={(e) => handleChange(e.currentTarget.files[0])} />
    </>
  )
}
