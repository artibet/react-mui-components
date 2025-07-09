import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyAutocompleteField } from '../form-fields'

const options = [
  { 'id': true, label: 'ΝΑΙ' },
  { 'id': false, label: 'ΟΧΙ' },
]

export const YesNoModalForm = ({
  open,
  title,
  label,
  value,
  onSubmit,
  onCancel,
  required = true,
  info = '',
  size = 'sm',  // sm, md, lg xl
  requiredMessage = 'Υποχρεωτικό πεδίο',
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ',
}) => {

  // ---------------------------------------------------------------------------------------
  // Default value
  // ---------------------------------------------------------------------------------------
  const defaultValues = {
    field: value || null,
  }


  // ---------------------------------------------------------------------------------------
  // Validation schema
  // ---------------------------------------------------------------------------------------
  const schema = yup.object({
    field: required
      ? yup
        .boolean()
        .required(requiredMessage)
      : yup
        .boolean()
        .nullable()
  })

  // ---------------------------------------------------------------------------------------
  // State and hooks
  // ---------------------------------------------------------------------------------------
  const form = useForm({ defaultValues, resolver: yupResolver(schema) })


  // ---------------------------------------------------------------------------------------
  // Reset textfield value
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (open) {
      form.clearErrors()
      form.setValue('field', value, {
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
    <Dialog fullWidth maxWidth={size} open={open} onClose={() => { }} >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {info && <Typography>{info}</Typography>}
        <MyAutocompleteField
          form={form}
          name='field'
          label={label}
          options={options}
          valueKey='id'
          labelKey='label'
          required={required}
          autofocus
          size='medium'
          sx={{ marginTop: 2, }}
        />
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={form.handleSubmit(data => onSubmit(data.field))}>{okLabel}</Button>
        <Button color='error' onClick={() => onCancel()}>{cancelLabel}</Button>
      </DialogActions>
    </Dialog >
  )
}
