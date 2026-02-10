import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Typography, Box, CircularProgress, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyTextField } from '../form-fields'
import { EditNoteRounded } from '@mui/icons-material'


export const TextModalForm = ({
  open,
  title,
  label,
  value,
  onSubmit,
  onCancel,
  size = 'sm',  // sm, md, lg xl
  required = true,
  requiredMessage = 'Υποχρεωτικό πεδίο',
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ',
  maxLength = 255,
  message = null,
  isLoading = false
}) => {

  // ---------------------------------------------------------------------------------------
  // Default value
  // ---------------------------------------------------------------------------------------
  const defaultValues = {
    text: value || '',
  }

  // ---------------------------------------------------------------------------------------
  // Validation schema
  // ---------------------------------------------------------------------------------------
  const schema = yup.object({
    text: required
      ? yup
        .string()
        .max(maxLength, `Παρακαλώ πληκτρολογείστε μέχρι ${maxLength} χαρακτήρες`)
        .required(requiredMessage)
      : yup
        .string()
        .max(maxLength)
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
  }, [open, value])

  // ---------------------------------------------------------------------------------------
  // Cancel handler
  // ---------------------------------------------------------------------------------------
  const handleCancel = (e) => {
    if (e) e.currentTarget.blur();
    onCancel();
  };

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Dialog fullWidth maxWidth={size} open={open} onClose={() => { }} onKeyDown={handleKeyDown} disableRestoreFocus >
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

      <form onSubmit={form.handleSubmit(data => onSubmit(data.text))} noValidate>
        <DialogContent sx={{ mt: 1 }}>

          {/* Support for custom JSX message objects */}
          {message && typeof message !== 'string' && (
            <Box sx={{ mb: 2 }}>{message}</Box>
          )}

          <MyTextField
            form={form}
            name='text'
            label={label}
            required={required}
            autofocus={true}
            maxLength={maxLength}
            sx={{ mt: 1, }}
          />

        </DialogContent>

        <DialogActions sx={{ p: 2, px: 3 }}>
          <Button
            color="inherit"
            onClick={handleCancel}
            sx={{ fontWeight: 700, color: 'text.secondary' }}
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
