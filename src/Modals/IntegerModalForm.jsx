import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyIntegerField } from '../form-fields'
import { notEmpty } from '../utils'


export const IntegerModalForm = ({
  open,
  title,
  label,
  value,
  onSubmit,
  onCancel,
  allowNegative = false,
  required = true,
  requiredMessage = 'Υποχρεωτικό πεδίο',
  size = 'sm',  // sm, md, lg xl
  minValue = null,
  maxValue = null,
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ'
}) => {

  // ---------------------------------------------------------------------------------------
  // Default value
  // ---------------------------------------------------------------------------------------
  const defaultValues = {
    num: notEmpty(value) ? value : null,
  }

  // ---------------------------------------------------------------------------------------
  // Validation schema
  // ---------------------------------------------------------------------------------------
  const schema = yup.object({
    num: yup
      .number()
      .when([], {
        is: _ => required,
        then: schema => schema.required(requiredMessage),
        otherwise: schema => schema.nullable(true)
      })
      .when([], {
        is: _ => minValue !== null,
        then: schema => schema.min(minValue, `Η τιμή πρέπει να είναι μεγαλύτερη ή ίση από ${minValue}`),
        otherwise: schema => schema
      })
      .when([], {
        is: _ => maxValue !== null,
        then: schema => schema.max(maxValue, `Η τιμή πρέπει να είναι μικρότερη ή ίση από ${maxValue}`),
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
      form.handleSubmit(data => onSubmit(data.num))()
    }
  }

  // ---------------------------------------------------------------------------------------
  // Reset text value
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (open) {
      form.clearErrors()
      form.setValue('num', notEmpty(value) ? value : null, {
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
        <MyIntegerField
          form={form}
          name='num'
          label={label}
          required={required}
          autofocus={true}
          allowNegative={allowNegative}
          sx={{ marginTop: 2, }}
        />
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={form.handleSubmit(data => onSubmit(data.num))}>{okLabel}</Button>
        <Button color='error' onClick={() => onCancel()}>{cancelLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}


