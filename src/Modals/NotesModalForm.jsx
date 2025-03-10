import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyNotesField } from '../form-fields'


export const NotesModalForm = ({
  open,
  title,
  label,
  message = null,
  value,
  onSubmit,
  onCancel,
  size = 'sm',  // sm, md, lg xl
  rows = 5,
  required = false,
  requiredMessage = 'Υποχρεωτικό πεδίο',
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ',
}) => {

  // ---------------------------------------------------------------------------------------
  // Default value
  // ---------------------------------------------------------------------------------------
  const defaultValues = {
    notes: value || '',
  }

  // ---------------------------------------------------------------------------------------
  // Validation schema
  // ---------------------------------------------------------------------------------------
  const schema = yup.object({
    notes: required
      ? yup
        .string()
        .required(requiredMessage)
      : yup
        .string()
  })

  // ---------------------------------------------------------------------------------------
  // State and hooks
  // ---------------------------------------------------------------------------------------
  const form = useForm({ defaultValues, resolver: yupResolver(schema) })

  // ---------------------------------------------------------------------------------------
  // Reset notes value
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (open) {
      form.clearErrors()
      form.setValue('notes', value || '', {
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
    <Dialog fullWidth maxWidth={size} open={open} onClose={() => { }} disableRestoreFocus >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {message && <Typography >{message}</Typography>}
        <MyNotesField
          form={form}
          name='notes'
          label={label}
          required={required}
          rows={rows}
          autofocus={true}
          sx={{ marginTop: 2, }}
        />
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={form.handleSubmit(data => onSubmit(data.notes))}>{okLabel}</Button>
        <Button color='error' onClick={() => onCancel()}>{cancelLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}
