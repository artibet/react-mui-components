import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyAutocompleteField } from '../MyFormFields'


export const AutocompleteModalForm = ({
  show,
  title,
  label,
  value,
  onSubmit,
  onCancel,
  options = [],
  valueKey = 'id',
  labelKey = 'label',
  required = false,
  width = 500,
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

  // ---------------------------------------------------------------
  // submit on key down
  // ---------------------------------------------------------------
  // const handleKeyDown = e => {
  //   if (e.code === 'Enter' || e.code === 'NumpadEnter') {
  //     e.preventDefault()
  //     form.handleSubmit(onSubmit)()
  //   }
  // }

  // ---------------------------------------------------------------------------------------
  // Reset textfield value
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (show) {
      form.clearErrors()
      form.setValue('field', value, {
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
    <Dialog open={show} onClose={() => { }} /*onKeyDown={handleKeyDown}*/>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <MyAutocompleteField
          form={form}
          name='field'
          label={label}
          options={options}
          valueKey={valueKey}
          labelKey={labelKey}
          required={required}
          autofocus
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
