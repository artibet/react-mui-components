import React from 'react'
import { Chip } from '@mui/material'

export const StatusChip = ({
  label,
  isActive = false,
  activeBgColor = 'success.main',
  inactiveBgColor = '',
  activeVariant = 'filled',
  inactiveVariant = 'outlined',
  activeColor = '#ffffff',
  inactiveColor = 'text.secondary'
}) => {

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Chip
      label={label}
      variant={isActive ? activeVariant : inactiveVariant}
      size="small"
      sx={{
        fontWeight: 600, // Semi-bold για καλύτερη ανάγνωση
        minWidth: 80,
        // ΕΝΕΡΓΟ ΣΤΥΛ
        ...(isActive && {
          bgcolor: activeBgColor,     // Πιο έντονο χρώμα (π.χ. Sky Blue)
          color: activeColor,         // Λευκό κείμενο για μέγιστη αντίθεση
        }),
        // ΑΝΕΝΕΡΓΟ ΣΤΥΛ
        ...(!isActive && {
          color: inactiveColor, // Γκρι που διαβάζεται
          bgcolor: inactiveBgColor,
          borderColor: 'divider',  // Διακριτικό περίγραμμα
          opacity: 0.7,            // Όχι πολύ χαμηλό για να φαίνεται το κείμενο
        }),
        // Διασφάλιση ότι το κείμενο φαίνεται καθαρά
        '& .MuiChip-label': {
          px: 1,
        }
      }}
    />
  )
}