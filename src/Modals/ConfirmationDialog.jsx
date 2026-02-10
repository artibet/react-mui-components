import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Zoom,
  CircularProgress
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

export const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'ΕΠΙΒΕΒΑΙΩΣΗ',
  cancelText = 'ΑΚΥΡΩΣΗ',
  isLoading = false,
  type = 'warning' // warning | error | success
}) => {

  // ---------------------------------------------------------------------------------------
  // State and data
  // ---------------------------------------------------------------------------------------
  const config = {
    warning: { color: 'warning.main', icon: <WarningAmberRoundedIcon sx={{ fontSize: 40 }} /> },
    error: { color: 'error.main', icon: <ErrorOutlineRoundedIcon sx={{ fontSize: 40 }} /> },
    success: { color: 'success.main', icon: <CheckCircleOutlineRoundedIcon sx={{ fontSize: 40 }} /> },
  }[type] || { color: 'primary.main', icon: null };


  // ---------------------------------------------------------------------------------------
  // Close handler - Accept ESC
  // ---------------------------------------------------------------------------------------
  const handleClose = (event, reason) => {
    // If the user clicked outside, do nothing.
    if (reason === 'backdropClick') {
      return;
    }
    onCancel();
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Dialog
      open={open}
      onClose={handleClose} // Assigned the restricted closer here
      slots={{ transition: Zoom }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }
        },
        paper: {
          sx: {
            borderRadius: 4,
            padding: 1,
            maxWidth: 400,
            textAlign: 'center',
            backgroundImage: 'none'
          }
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            height: 70,
            bgcolor: `${config.color}20`,
            color: config.color,
            borderRadius: '50%',
            mb: 2
          }}
        >
          {config.icon}
        </Box>

        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.35rem', pt: 0, pb: 1 }}>
          {title}
        </DialogTitle>
      </Box>

      <DialogContent>
        <DialogContentText sx={{ color: 'text.secondary', fontWeight: 500, lineHeight: 1.6 }}>
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', gap: 2, px: 3, pb: 3, mt: 1 }}>
        <Button
          fullWidth
          variant="text"
          color="inherit"
          onClick={onCancel} // Explicitly triggers close via parent state
          sx={{ borderRadius: 3, fontWeight: 700, color: 'text.disabled' }}
        >
          {cancelText}
        </Button>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          color={type === 'error' ? 'error' : 'primary'}
          onClick={onConfirm}
          sx={{
            borderRadius: 3,
            fontWeight: 700,
            py: 1
          }}
        >
          {
            isLoading ? (
              <CircularProgress size={20} sx={{ color: 'inherit' }} />
            ) : (
              confirmText
            )
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
};