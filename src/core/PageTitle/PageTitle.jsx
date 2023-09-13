import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { ImArrowLeft } from 'react-icons/im'

export const PageTitle = ({
  title,
  titlePosition = 'right',
  showReturnButton = true,
  returnButtonLabel = 'ΕΠΙΣΤΡΟΦΗ',
  onReturn = null,
  titleProps = {},
  returnButtonProps = {}
}) => {

  // ---------------------------------------------------------------------------------------
  // returnButton JSX
  // ---------------------------------------------------------------------------------------
  const returnButtonJsx =
    <Button color='warning' onClick={onReturn ? onReturn() : () => history.back()} {...returnButtonProps}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <ImArrowLeft />
        <Typography>{returnButtonLabel}</Typography>
      </Stack>
    </Button >

  // ---------------------------------------------------------------------------------------
  // Title JSX
  // ---------------------------------------------------------------------------------------
  const titleJsx =
    <Typography variant='h6' {...titleProps}>{title}</Typography>

  // ---------------------------------------------------------------------------------------
  // Content justification
  // ---------------------------------------------------------------------------------------
  let justifyContent = 'space-between'
  if (!showReturnButton) {
    if (titlePosition === 'left') {
      justifyContent = 'flex-start'
    }
    else {
      justifyContent = 'flex-end'
    }
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: { justifyContent }, alignItems: 'center' }}>
        {titlePosition === 'left' && titleJsx}
        {showReturnButton && returnButtonJsx}
        {titlePosition === 'right' && titleJsx}
      </Box>
      <hr />
    </>
  )
}

