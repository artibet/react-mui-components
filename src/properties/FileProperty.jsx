import React from 'react'
import { Button, Chip, Divider, Grid2, Link, ListItem, Stack, Typography } from '@mui/material'
import { router } from '@inertiajs/react'
import { DeleteOutline, ErrorOutline, Upload } from '@mui/icons-material'
import { ConfirmationDialog } from '../Modals'

export const FileProperty = ({
  label,
  exists = false,
  fileName = null,
  placeholder = 'File',
  render = null,
  editable = false,
  required = true,
  downloadUrl = null,
  createUrl = null,
  updateUrl = null,
  deleteUrl = null,
  hasDivider = true
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const isMissing = !exists && required
  const [isLoading, setIsLoading] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const fileInputRef = React.useRef(null)

  // ---------------------------------------------------------------------------------------
  // Select file click handler
  // ---------------------------------------------------------------------------------------
  const handleClick = e => {
    e.currentTarget.blur()
    fileInputRef.current.click()
  }

  // ---------------------------------------------------------------------------------------
  // Delete click handler
  // ---------------------------------------------------------------------------------------
  const handleDeleteClick = e => {
    e.currentTarget.blur()
    setShowConfirm(true)
  }

  // ---------------------------------------------------------------------------------------
  // submit handler
  // ---------------------------------------------------------------------------------------
  const handleSubmit = e => {
    const file = e.target.files[0]
    if (!file) return

    setIsLoading(true)

    router.post(exists ? updateUrl : createUrl, {
      file: file,
    }, {
      forceFormData: true,
      preserveScroll: true,
      onFinish: () => {
        setIsLoading(false)
        e.target.value = ''
      }
    })
  }

  // ---------------------------------------------------------------------------------------
  // Delete handler
  // ---------------------------------------------------------------------------------------
  const handleDelete = () => {
    setIsLoading(true)
    router.delete(deleteUrl, {
      preserveScroll: true,
      onFinish: () => {
        setIsLoading(false)
        setShowConfirm(false)
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
            {required && !exists ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body1" color="error.main" fontWeight={600}>
                  Δεν έχει επιλεγεί αρχείο
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
              <Link
                href={downloadUrl}
                download={fileName}
                underline='hover'
              >
                <Typography variant="body1" fontWeight={500}>
                  {fileName ? fileName : placeholder}
                </Typography>
              </Link>
            )}
          </Grid2>

          {/* 3. Action Column */}
          <Grid2 size={{ xs: 12, sm: 3 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {editable && (
              <Stack direction="row" spacing={1}>
                {exists && deleteUrl && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteClick}
                    disabled={isLoading}
                    sx={{ minWidth: 'auto', px: 1.5, borderRadius: 2 }}
                  >
                    <DeleteOutline fontSize="small" />
                  </Button>
                )}

                <Button
                  size="small"
                  variant={isMissing ? "contained" : "outlined"}
                  color={isMissing ? "error" : "primary"}
                  startIcon={<Upload fontSize="small" />}
                  onClick={handleClick}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 700,
                    minWidth: '120px'
                  }}
                >
                  {
                    !exists ? 'Επιλογή' : 'Αντικατάσταση'
                  }
                </Button>
              </Stack>
            )}
          </Grid2>

        </Grid2>
      </ListItem >

      {hasDivider && <Divider component='li' />}

      {/* Κρυφό Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleSubmit}
        style={{ display: 'none' }}
      />

      <ConfirmationDialog
        open={showConfirm}
        title='Επιβεβαίωση Διαγραφής'
        message='Να διαγραφεί το επιλεγμένο αρχείο;'
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}
