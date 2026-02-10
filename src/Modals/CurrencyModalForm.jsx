import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyCurrencyField } from '../form-fields'
import { formatCurrency, notEmpty } from '../utils'


export const CurrencyModalForm = ({
  open,
  title,
  label,
  value,
  onSubmit,
  onCancel,
  size = 'sm',  // sm, md, lg xl
  required = true,
  minValue = null,
  maxValue = null,
  requiredMessage = 'Υποχρεωτικό πεδίο',
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ',
  isLoading = false
}) => {

  // ---------------------------------------------------------------------------------------
  // Default value
  // ---------------------------------------------------------------------------------------
  const defaultValues = {
    poso: notEmpty(value) ? value : null,
  }

  // ---------------------------------------------------------------------------------------
  // Validation schema
  // ---------------------------------------------------------------------------------------
  const schema = yup.object({
    poso: yup
      .number()
      .when([], {
        is: _ => required,
        then: schema => schema.required(requiredMessage),
        otherwise: schema => schema.nullable(true)
      })
      .when([], {
        is: _ => minValue !== null,
        then: schema => schema.min(minValue, `Το ποσό πρέπει να είναι μεγαλύτερο ή ίσο από ${formatCurrency(minValue)}`),
        otherwise: schema => schema

      })
      .when([], {
        is: _ => maxValue !== null,
        then: schema => schema.max(maxValue, `Το ποσό πρέπει να είναι μικρότερο ή ίσο από ${formatCurrency(maxValue)}`),
        otherwise: schema => schema
      })
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
      form.handleSubmit(data => onSubmit(data.poso))()
    }
  }

  // ---------------------------------------------------------------------------------------
  // Reset text value
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (open) {
      form.clearErrors()
      form.setValue('poso', notEmpty(value) ? value : null, {
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
        <MyCurrencyField
          form={form}
          name='poso'
          label={label}
          required={required}
          autofocus={true}
          sx={{ marginTop: 2, }}
        />
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={form.handleSubmit(data => onSubmit(data.poso))}>{okLabel}</Button>
        <Button color='error' onClick={() => onCancel()}>{cancelLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}
