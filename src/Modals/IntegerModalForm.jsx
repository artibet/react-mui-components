import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyIntegerField } from '../form-fields'

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
  minValue = null,
  maxValue = null,
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ'
}) => {

  // ---------------------------------------------------------------------------------------
  // Default value
  // ---------------------------------------------------------------------------------------
  const defaultValues = {
    num: value || '',
  }

  // ---------------------------------------------------------------------------------------
  // Validation schema
  // ---------------------------------------------------------------------------------------
  const schema = yup.object({
    num: yup
      .number()
      .when([], {
        is: () => required,
        then: () => yup.number().required(requiredMessage),
        otherwise: () => yup.number().nullable(true)
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
      form.setValue('num', value || '', {
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
        <MyIntegerField
          form={form}
          name='num'
          label={label}
          required={required}
          autofocus={true}
          allowNegative={allowNegative}
          sx={{ width: 500, marginTop: 2, }}
        />
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={form.handleSubmit(data => onSubmit(data.num))}>{okLabel}</Button>
        <Button color='error' onClick={() => onCancel()}>{cancelLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}


