import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Stack, Box, Typography, Divider, CircularProgress, } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyNotesField, MyTextField, MyUploadField } from '../form-fields'
import { EditNoteRounded } from '@mui/icons-material'

export const SelectFileModalForm = ({
  open,
  acceptFiles = '*',
  title = 'Νέο Αρχείο',
  description = true,
  descriptionType = 'string',     // string | text
  descriptionRequired = true,
  descriptionLabel = 'Περιγραφή Αρχείου',
  descriptionRequiredMessage = 'Παρακαλώ συμπληρώστε την περιγραφή του αρχείου',
  fileSelectLabel = 'Επιλογή Αρχείου',
  maxFileName = 255,
  onSubmit,
  onCancel,
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ',
  message = null,
  isLoading = false,
  size = 'sm'
}) => {

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
  let descrSchema = yup.string().nullable();
  if (description) {

    // 1. Check requirement prop
    if (descriptionRequired) {
      descrSchema = descrSchema.required(descriptionRequiredMessage);
    }

    // 2. Check length type restriction prop
    if (descriptionType === 'string') {
      descrSchema = descrSchema.max(maxFileName, `Το πεδίο δεν πρέπει να υπερβαίνει τους ${maxFileName} χαρακτήρες`);
    }
  }

  const schema = yup.object({
    descr: descrSchema,
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
      form.reset(defaultValues);
      form.clearErrors();
    }
  }, [open])

  // ---------------------------------------------------------------------------------------
  // Cancel handler
  // ---------------------------------------------------------------------------------------
  const handleCancel = (e) => {
    if (e) e.currentTarget.blur();
    onCancel();
  };

  // ---------------------------------------------------------------------------------------
  // Close dialog handler
  // ---------------------------------------------------------------------------------------
  const handleClose = (e, reason) => {
    if (reason === 'escapeKeyDown') {
      onCancel();
    }
  }

  // ---------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------
  return (
    <Dialog
      maxWidth={size}
      fullWidth
      open={open}
      onClose={handleClose}
      disableRestoreFocus={false} // Crucial for accessibility
      slotProps={{
        paper: {
          sx: { borderRadius: 3, p: 0.5 }
        }
      }}
    >

      <DialogTitle sx={{ pb: 1.5 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ bgcolor: 'primary.light', color: 'primary.main', p: 1, borderRadius: 2, display: 'flex' }}>
            <EditNoteRounded />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
              {title}
            </Typography>
            {message && typeof message === 'string' ? (
              <Typography variant="caption" color="text.secondary">
                {message}
              </Typography>
            ) : null}
          </Box>
        </Stack>
      </DialogTitle>

      <Divider sx={{ mx: 3, opacity: 0.5 }} />

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>

        <DialogContent sx={{ mt: 1 }}>

          {/* Support for custom JSX message objects */}
          {message && typeof message !== 'string' && (
            <Box sx={{ mb: 2 }}>{message}</Box>
          )}

          <Stack sx={{ marginTop: 2 }} gap={3}>

            {
              description && descriptionType == 'string' &&
              < MyTextField
                form={form}
                name='descr'
                label={descriptionLabel}
                required={descriptionRequired}
                autofocus
              />
            }

            <MyUploadField
              form={form}
              name='filename'
              label={fileSelectLabel}
              required
              acceptFiles={acceptFiles}
            />

            {
              description && descriptionType == 'text' &&
              <MyNotesField
                form={form}
                name='descr'
                label={descriptionLabel}
                required={descriptionRequired}
              />
            }

          </Stack>

        </DialogContent >

        <DialogActions sx={{ p: 2, px: 3 }}>
          <Button
            color="inherit"
            onClick={handleCancel}
            sx={{ fontWeight: 700, color: 'text.secondary', minWidth: 150, }}
          >
            {cancelLabel}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              px: 4,
              fontWeight: 700,
              boxShadow: 'none',
              minWidth: 150,
              '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }
            }}
          >
            {
              isLoading ? (
                <CircularProgress size={20} sx={{ color: 'inherit' }} />
              ) : (
                okLabel
              )
            }
          </Button>
        </DialogActions>

      </form>

    </Dialog >
  )
}
