import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Typography, Box, CircularProgress, Stack, Zoom, Divider } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MyAutocompleteApiField } from '../form-fields'
import { EditNoteRounded } from '@mui/icons-material'

export const AutocompleteApiModalForm = ({
  open,
  title,
  label,
  optionsUrl,
  value,
  onSubmit,
  onCancel,
  valueKey = 'id',
  labelKey = 'label',
  required = true,
  size = 'sm',  // sm, md, lg xl
  requiredMessage = 'Υποχρεωτικό πεδίο',
  minChars = 1,
  okLabel = 'ΚΑΤΑΧΩΡΗΣΗ',
  cancelLabel = 'ΑΚΥΡΩΣΗ',
  message = null,
  isLoading = false
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


  // ---------------------------------------------------------------------------------------
  // Reset textfield value
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

          <MyAutocompleteApiField
            form={form}
            name='field'
            label={label}
            optionsUrl={optionsUrl}
            minChars={minChars}
            valueKey={valueKey}
            labelKey={labelKey}
            required={required}
            autofocus
            sx={{ marginTop: 1, }}
          />
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
