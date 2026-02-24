import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Typography, Box, CircularProgress, Stack, Zoom, Divider } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyDateField, MyTextField } from '../form-fields'
import { EditNoteRounded } from '@mui/icons-material'


export const RegistrationModalForm = ({
  open,
  title,
  registrationNumber,
  registrationDate,
  registrationNumberLabel = 'Αριθμός Πρωτοκόλλου',
  registrationDateLabel = 'Ημερομηνία Πρωτοκόλλου',
  onSubmit,
  onCancel,
  size = 'sm',  // sm, md, lg xl
  required = false,
  registrationNumberRequiredMessage = 'Συμπληρώστε τον αριθμό πρωτοκόλλου',
  registrationDateRequiredMessage = 'Συμπληρώστε ή επιλέξτε την ημερομηνία πρωτοκόλλου',
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ',
  registrationNumberMaxLength = 255,
  message = null,
  isLoading = false
}) => {

  // ---------------------------------------------------------------------------------------
  // Default value
  // ---------------------------------------------------------------------------------------
  const defaultValues = React.useMemo(() => ({
    registration_number: registrationNumber || '',
    registration_date: registrationDate || null,
  }), [registrationNumber, registrationDate])

  // ---------------------------------------------------------------------------------------
  // Validation schema
  // ---------------------------------------------------------------------------------------
  const schema = yup.object({
    registration_number: required
      ? yup
        .string()
        .max(registrationNumberMaxLength, `Παρακαλώ πληκτρολογείστε μέχρι ${registrationNumberMaxLength} χαρακτήρες`)
        .required(registrationNumberRequiredMessage)
      : yup
        .string()
        .max(registrationNumberMaxLength, `Παρακαλώ πληκτρολογείστε μέχρι ${registrationNumberMaxLength} χαρακτήρες`),
    registration_date: required
      ? yup
        .date()
        .typeError('Μη έγκυρη μορφή ημερομηνίας')
        .required(registrationDateRequiredMessage)
      : yup
        .date()
        .typeError('Μη έγκυρη μορφή ημερομηνίας')
        .nullable()

  })

  // ---------------------------------------------------------------------------------------
  // State and hooks
  // ---------------------------------------------------------------------------------------
  const form = useForm({ defaultValues, resolver: yupResolver(schema) })

  // ---------------------------------------------------------------------------------------
  // Reset text value
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (open) {
      form.reset(defaultValues);
      form.clearErrors();
    }
  }, [open, defaultValues])

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

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Dialog
      fullWidth
      maxWidth={size}
      open={open}
      onClose={handleClose}
      slots={{ transition: Zoom }}
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

      <form onSubmit={form.handleSubmit(data => onSubmit(data))} noValidate>
        <DialogContent sx={{ mt: 1 }}>

          {/* Support for custom JSX message objects */}
          {message && typeof message !== 'string' && (
            <Box sx={{ mb: 2 }}>{message}</Box>
          )}

          <Stack direction="column" spacing={2.5}>

            {/* registration number */}
            <MyTextField
              form={form}
              name='registration_number'
              label={registrationNumberLabel}
              required={required}
              autofocus={true}
              maxLength={registrationNumberMaxLength}
              sx={{ mt: 1, }}
            />

            {/* registration date */}
            <MyDateField
              form={form}
              name='registration_date'
              label={registrationDateLabel}
              required={required}
              sx={{ mt: 1, }}
            />

          </Stack>

        </DialogContent>

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
    </Dialog>
  )
}
