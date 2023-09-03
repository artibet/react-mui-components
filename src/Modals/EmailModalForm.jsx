import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyEmailField } from '../MyFormFields'

const emailRegEx = /^$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const EmailModalForm = ({
  show,
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
  maxLength = 255,
}) => {

  // ---------------------------------------------------------------------------------------
  // Default value
  // ---------------------------------------------------------------------------------------
  const defaultValues = {
    email: value || '',
  }

  // ---------------------------------------------------------------------------------------
  // Validation schema
  // ---------------------------------------------------------------------------------------
  const schema = yup.object({
    email: required
      ? yup
        .string()
        .matches(emailRegEx, 'Μη έγκυρη μορφή Email')
        .required(requiredMessage)
      : yup
        .string()
        .matches(emailRegEx, 'Μη έγκυρη μορφή Email')
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
  // Reset textfield value
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (show) {
      form.clearErrors()
      form.setValue('email', value, {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false
      })
    }
  }, [show, value])

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Dialog open={show} onClose={() => { }} onKeyDown={handleKeyDown} disableRestoreFocus>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <MyEmailField
          form={form}
          label={label}
          required={required}
          autofocus={true}
          maxLength={maxLength}
          sx={{ width: width, marginTop: 2, }}
        />
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={form.handleSubmit(onSubmit)}>{okLabel}</Button>
        <Button color='error' onClick={() => onCancel()}>{cancelLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}
