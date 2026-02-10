import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyAutocompleteMultiField } from '../form-fields'



export const AutocompleteMultiModalForm = ({
  open,
  title,
  label,
  value = [],
  onSubmit,
  onCancel,
  options = [],
  valueKey = 'id',
  labelKey = 'label',
  required = true,
  size = 'sm',  // sm, md, lg xl
  requiredMessage = 'Επιλέξτε τουλάχιστον μία τιμή',
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ',
  isLoading = false
}) => {

  // ---------------------------------------------------------------------------------------
  // Default value
  // ---------------------------------------------------------------------------------------
  const defaultValues = {
    field: value || [],
  }


  // ---------------------------------------------------------------------------------------
  // Validation schema
  // ---------------------------------------------------------------------------------------
  const schema = yup.object({
    field: required
      ? yup
        .array()
        .min(1, requiredMessage)
      : yup
        .array()
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
        <MyAutocompleteMultiField
          form={form}
          name='field'
          label={label}
          options={options}
          valueKey={valueKey}
          labelKey={labelKey}
          required={required}
          autofocus
          sx={{ marginTop: 2, }}
        />
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={form.handleSubmit((data) => onSubmit(data.field))}>{okLabel}</Button>
        <Button color='error' onClick={() => onCancel()}>{cancelLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}
