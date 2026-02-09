import React from 'react'
import { Button, CircularProgress, Divider, Grid2, ListItem, Typography } from '@mui/material'
import { router } from '@inertiajs/react'
import { ToggleOff, ToggleOn } from '@mui/icons-material'
import { ConfirmationDialog } from '../Modals'

export const ToggleProperty = ({
  label,
  value,    // true | false
  render = null,
  fieldName = null,
  editable = false,
  activationLabel = 'Ενεργοποίηση',
  deactivationLabel = 'Απενεργοποίηση',
  activationMessage = '',
  deactivationMessage = '',
  updateUrl = null,
  hasDivider = true
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  // ---------------------------------------------------------------------------------------
  // Submit handler
  // ---------------------------------------------------------------------------------------
  const handleSubmit = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    setShowConfirm(false)
    router.put(updateUrl, {
      field: fieldName,
      value: value ? 0 : 1
    }, {
      preserveScroll: true,
      onFinish: () => setIsLoading(false)
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

          {/* 2. Value Column  */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            {render || <Typography variant="body1" fontWeight={500}>{value ? 1 : 0}</Typography>}
          </Grid2>

          {/* 3. Action Column */}
          <Grid2 size={{ xs: 12, sm: 3 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {editable && (
              <Button
                size="small"
                variant='outlined'
                color={value ? 'error' : 'success'}
                startIcon={isLoading ? null : value ? <ToggleOff fontSize='small' /> : <ToggleOn fontSize='small' />}
                onClick={() => setShowConfirm(true)}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 700,
                  minWidth: '120px'
                }}
              >
                {
                  isLoading ? (
                    <CircularProgress size={20} sx={{ color: 'inherit' }} />
                  ) : (
                    value ? deactivationLabel : activationLabel
                  )
                }
              </Button>
            )}
          </Grid2>

        </Grid2>
      </ListItem >

      {hasDivider && <Divider component='li' />}

      <ConfirmationDialog
        open={showConfirm}
        title={value ? deactivationLabel : activationLabel}
        message={value ? deactivationMessage : activationMessage}
        onConfirm={handleSubmit}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}
