import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
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
  width = 500,
  required = true,
  requiredMessage = 'Υποχρεωτικό πεδίο',
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ',
  maxLength = 255
}) => {

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
      form.handleSubmit(onSubmit)()
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
    <Dialog open={open} onClose={() => { }} onKeyDown={handleKeyDown} disableRestoreFocus >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <MyTextField
          form={form}
          name='text'
          label={label}
          required={required}
          autofocus={true}
          maxLength={maxLength}
          sx={{ width: width, marginTop: 2, }}
        />
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={form.handleSubmit(data => onSubmit(data.text))}>{okLabel}</Button>
        <Button color='error' onClick={() => onCancel()}>{cancelLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}
