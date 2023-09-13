import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { ImArrowLeft } from 'react-icons/im'

export const GoBack = ({
  position = 'top',
  label = 'ΕΠΙΣΤΡΟΦΗ'
}) => {
  return (
    <Box sx={{ marginBottom: 1 }}>
      {position === 'bottom' && <hr />}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button color="warning" onClick={() => history.back()}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <ImArrowLeft />
            <Typography>{label}</Typography>
          </Stack>
        </Button >
      </Box>
      {position === 'top' && <hr />}
    </Box>
  )
}
