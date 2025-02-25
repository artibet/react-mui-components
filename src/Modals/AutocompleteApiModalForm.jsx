import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyAutocompleteApiField } from '../form-fields'


export const AutocompleteApiModalForm = ({
  open,
  title,
  label,
  optionsUrl,
  value,
  onSubmit,
  onCancel,
  valueKey = 'id',
  labelKey = 'label',
  required = true,
  size = 'sm',  // sm, md, lg xl
  requiredMessage = 'Υποχρεωτικό πεδίο',
  minChars = 1,
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
        .string()
        .required(requiredMessage)
      : yup
        .string()
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
        <MyAutocompleteApiField
          form={form}
          name='field'
          label={label}
          optionsUrl={optionsUrl}
          minChars={minChars}
          valueKey={valueKey}
          labelKey={labelKey}
          required={required}
          autofocus
          sx={{ marginTop: 2, }}
        />
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={form.handleSubmit(onSubmit)}>{okLabel}</Button>
        <Button color='error' onClick={() => onCancel()}>{cancelLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}
