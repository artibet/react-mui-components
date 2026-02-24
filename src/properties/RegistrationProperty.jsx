import React from 'react'
import { Button, Chip, Divider, Grid2, ListItem, Stack, Typography } from '@mui/material'
import { router } from '@inertiajs/react'
import { Edit, ErrorOutline } from '@mui/icons-material'
import { formatDate } from 'date-fns'
import { RegistrationModalForm } from '../Modals/RegistrationModalForm'

export const RegistrationProperty = ({
  label = 'Πρωτόκολλο',
  registrationNumber,
  registrationDate,
  registrationNumberLabel = 'Αριθμός Πρωτοκόλλου',
  registrationDateLabel = 'Ημερομηνία Πρωτοκόλλου',
  render = null,
  editable = false,
  required = true,
  placeholder = '----------',
  modalTitle = 'Επεξεργασία Πρωτοκόλλου',
  updateUrl = null,
  registrationNumberMaxLength = 255,
  message = null,
  hasDivider = true
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [showForm, setShowForm] = React.useState(false)
  const isMissing = (!registrationNumber || !registrationDate) && required
  const [isLoading, setIsLoading] = React.useState(false)
  const value = registrationNumber && registrationDate
    ? `${registrationNumber}/${formatDate(registrationDate, '-')}`
    : placeholder

  // ---------------------------------------------------------------------------------------
  // Click handler
  // ---------------------------------------------------------------------------------------
  const handleClick = e => {
    e.currentTarget.blur()
    setShowForm(true)
  }

  // ---------------------------------------------------------------------------------------
  // Submit handler
  // ---------------------------------------------------------------------------------------
  const handleSubmit = data => {
    setIsLoading(true)
    router.put(updateUrl, data, {
      preserveScroll: true,
      onFinish: () => {
        setIsLoading(false)
        setShowForm(false)
      }
    })
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <>
      <ListItem sx={{ py: 2.5, px: 4 }}>
        <Grid2 container spacing={2} sx={{ width: '100%' }} alignItems="center">

          {/* 1. Label Column */}
          <Grid2 size={{ xs: 12, sm: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
              {label}
            </Typography>
          </Grid2>

          {/* 2. Value Column (with Missing state handling) */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            {required && (!registrationNumber || !registrationDate) ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body1" color="error.main" fontWeight={600}>
                  Δεν έχει καταχωρηθεί
                </Typography>
                <Chip
                  size="small"
                  color="error"
                  variant="soft" // If using MUI Lab or custom theme, otherwise use default
                  label="Απαιτείται"
                  icon={<ErrorOutline sx={{ fontSize: '14px !important' }} />}
                  sx={{ fontWeight: 700, height: 22 }}
                />
              </Stack>
            ) : (
              render ||
              <Typography variant="body1" fontWeight={500}>
                {value}
              </Typography>
            )}
          </Grid2>

          {/* 3. Action Column */}
          <Grid2 size={{ xs: 12, sm: 3 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {editable && (
              <Button
                size="small"
                variant={isMissing ? "contained" : "outlined"}
                color={isMissing ? "error" : "primary"}
                startIcon={<Edit fontSize="small" />}
                onClick={handleClick}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 700,
                  minWidth: '120px'
                }}
              >
                {
                  (!registrationNumber && !registrationDate) ? 'Συμπλήρωση' : 'Επεξεργασία'
                }
              </Button>
            )}
          </Grid2>

        </Grid2>
      </ListItem >

      {hasDivider && <Divider component='li' />}

      <RegistrationModalForm
        open={showForm}
        title={modalTitle}
        registrationNumberLabel={registrationNumberLabel}
        registrationDateLabel={registrationDateLabel}
        registrationNumber={registrationNumber}
        registrationDate={registrationDate}
        required={required}
        registrationNumberMaxLength={registrationNumberMaxLength}
        registrationNumberRequiredMessage='Συμπληρώστε τον αριθμό πρωτοκόλλου'
        registrationDateRequiredMessage='Συμπληρώστε ή επιλέξτε την ημερομηνία πρωτοκόλλου'
        onSubmit={handleSubmit}
        onCancel={() => setShowForm(false)}
        message={message}
        isLoading={isLoading}
      />
    </>
  )
}
