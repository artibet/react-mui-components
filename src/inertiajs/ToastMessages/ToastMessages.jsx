import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Snackbar, Alert, Slide, Box, Typography } from '@mui/material';

export const ToastMessages = ({ defaultDirection = 'left' }) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const { flash } = usePage().props;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [direction, setDirection] = useState(defaultDirection);

  // ---------------------------------------------------------------------------------------
  // Set type and direction when the flash message changes
  // ---------------------------------------------------------------------------------------
  useEffect(() => {
    const type = flash.success ? 'success' : flash.error ? 'error' : flash.warning ? 'warning' : flash.info ? 'info' : null;

    if (type && flash[type]) {
      // Logic for dynamic direction
      if (type === 'error') {
        setDirection('down'); // Errors drop from top
      } else {
        setDirection('left'); // Success slides from right
      }

      setMessage(flash[type]);
      setSeverity(type);
      setOpen(true);
    }
  }, [flash]);

  // ---------------------------------------------------------------------------------------
  // Close handler
  // ---------------------------------------------------------------------------------------
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      // Positioning based on direction
      anchorOrigin={{
        vertical: direction === 'down' ? 'top' : 'top',
        horizontal: 'right'
      }}
      // Pass the direction prop to the Slide component via slots
      slots={{
        transition: (props) => <Slide {...props} direction={direction} />
      }}
      slotProps={{
        root: { sx: { mt: direction === 'down' ? 0 : 6 } }
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',
          minWidth: '320px',
          borderRadius: '16px',
          backdropFilter: 'blur(12px)',
          backgroundColor: (theme) => `${theme.palette[severity].main}E6`,
          boxShadow: (theme) => `0 12px 32px ${theme.palette[severity].main}33`,
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box>
          {/* <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 0.5, opacity: 0.8 }}>
            {severity === 'success' ? 'Ολοκληρώθηκε' : 'Προσοχή'}
          </Typography> */}
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {message}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
};