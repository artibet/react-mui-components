import React from 'react'
import { Button, Chip, Divider, Grid2, ListItem, Stack, Typography } from '@mui/material'
import { router } from '@inertiajs/react'
import { DatetimeModalForm } from '@artibet/react-mui-components/modals'
import { Edit, ErrorOutline } from '@mui/icons-material'
import { formatDateTime } from '@artibet/react-mui-components/utils'

export const DateTimeProperty = ({
  label,
  value,
  render = null,
  fieldName = null,
  editable = false,
  required = true,
  placeholder = '',
  modalTitle = 'Επεξεργασία',
  updateUrl = null,
  message = null,
  hasDivider = true
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [showForm, setShowForm] = React.useState(false)
  const isMissing = !value && required

  // ---------------------------------------------------------------------------------------
  // Submit handler
  // ---------------------------------------------------------------------------------------
  const handleSubmit = data => {
    router.put(updateUrl, {
      field: fieldName,
      value: data
    }, {
      preserveScroll: true
    })
    setShowForm(false)
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
            {required && !value ? (
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
                {value ? formatDateTime(value) : placeholder}
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
                onClick={() => setShowForm(true)}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 700,
                  minWidth: '120px'
                }}
              >
                {!value ? 'Συμπλήρωση' : 'Επεξεργασία'}
              </Button>
            )}
          </Grid2>

        </Grid2>
      </ListItem >

      {hasDivider && <Divider component='li' />}

      <DatetimeModalForm
        open={showForm}
        title={modalTitle}
        label={label}
        value={value}
        required={required}
        onSubmit={handleSubmit}
        onCancel={() => setShowForm(false)}
        message={message}
      />

    </>
  )
}
