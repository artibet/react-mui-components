import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Typography, Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyTextField } from '../form-fields'


export const TextModalForm = ({
  open,
  title,
  label,
  value,
  onSubmit,
  onCancel,
  size = 'sm',  // sm, md, lg xl
  required = true,
  requiredMessage = 'Υποχρεωτικό πεδίο',
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ',
  maxLength = 255,
  message = null
}) => {

  // ---------------------------------------------------------------------------------------
  // Render message helper function
  // ---------------------------------------------------------------------------------------
  const renderMessage = () => {
    if (!message) return null

    if (typeof message === 'string') {
      return (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {message}
        </Typography>
      )
    }

    return <Box sx={{ mb: 2 }}>{message}</Box>;
  }

  // ---------------------------------------------------------------------------------------
  // Default value
  // ---------------------------------------------------------------------------------------
  const defaultValues = {
    text: value || '',
  }

  // ---------------------------------------------------------------------------------------
  // Validation schema
  // ---------------------------------------------------------------------------------------
  const schema = yup.object({
    text: required
      ? yup
        .string()
        .max(maxLength, `Παρακαλώ πληκτρολογείστε μέχρι ${maxLength} χαρακτήρες`)
        .required(requiredMessage)
      : yup
        .string()
        .max(maxLength)
  })

  // ---------------------------------------------------------------------------------------
  // State and hooks
  // ---------------------------------------------------------------------------------------
  const form = useForm({ defaultValues, resolver: yupResolver(schema) })

  // ---------------------------------------------------------------
  // submit on key down
  // ---------------------------------------------------------------
  const handleKeyDown = e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault()
      form.handleSubmit(data => onSubmit(data.text))()
    }
  }

  // ---------------------------------------------------------------------------------------
  // Reset text value
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (open) {
      form.clearErrors()
      form.setValue('text', value || '', {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false
      })
    }
  }, [open, value])

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Dialog fullWidth maxWidth={size} open={open} onClose={() => { }} onKeyDown={handleKeyDown} disableRestoreFocus >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {renderMessage()}
        <MyTextField
          form={form}
          name='text'
          label={label}
          required={required}
          autofocus={true}
          maxLength={maxLength}
          sx={{ marginTop: 2, }}
        />
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={form.handleSubmit(data => onSubmit(data.text))}>{okLabel}</Button>
        <Button color='error' onClick={() => onCancel()}>{cancelLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}
