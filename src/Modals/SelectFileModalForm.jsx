import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Stack, } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyTextField, MyUploadField } from '../form-fields'

export const SelectFileModalForm = ({
  open,
  onSubmit,
  maxFileName = 255,
  onCancel }) => {

  // ---------------------------------------------------------------------------------------
  // Default values
  // ---------------------------------------------------------------------------------------
  const defaultValues = {
    descr: '',
    filename: null,
  }

  // ---------------------------------------------------------------------------------------
  // Validation schema
  // ---------------------------------------------------------------------------------------
  const schema = yup.object({
    descr: yup
      .string()
      .required('Παρακαλώ συμπληρώστε την περιγραφή του αρχείου')
      .max(maxFileName, `Η περιγραφή δεν πρέπει να υπερβαίνει τους ${maxFileName} χαρακτήρες`),
    filename: yup
      .mixed()
      .required('Παρακαλώ επιλέξτε ένα αρχείο')
  })

  // ---------------------------------------------------------------------------------------
  // State and hooks
  // ---------------------------------------------------------------------------------------
  const form = useForm({ defaultValues, resolver: yupResolver(schema) })

  // ---------------------------------------------------------------------------------------
  // Reset form on open
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (open) {
      form.clearErrors()
      form.setValue('descr', '')
      form.setValue('filename', null)
    }
  }, [open])

  // ---------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------
  return (
    <Dialog maxWidth='sm' fullWidth open={open} onClose={() => { }} >
      <DialogTitle>Νέο Αρχείο</DialogTitle>
      <DialogContent>

        <Stack sx={{ marginTop: 2 }} gap={3}>

          <MyTextField
            form={form}
            name='descr'
            label='Περιγραφή Αρχείου'
            required
            autofocus
          />

          <MyUploadField
            form={form}
            name='filename'
            label='Επιλογή Αρχείου'
            required
          />

        </Stack>

      </DialogContent >
      <DialogActions>
        <Button color='success' onClick={form.handleSubmit(onSubmit)}>ΚΑΤΑΧΩΡΗΣΗ</Button>
        <Button color='error' onClick={() => onCancel()}>ΑΚΥΡΩΣΗ</Button>
      </DialogActions>

    </Dialog >
  )
}
