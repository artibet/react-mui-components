import React from 'react'
import { Alert } from '@mui/material'

export const ShowErrors = ({ errors, marginBottom = 3 }) => {
  if (Object.keys(errors).length === 0) return null

  return (
    <>
      {
        Object.keys(errors).map((key, index) =>
          <Alert sx={{ marginBottom: marginBottom }} key={index} severity='error'>{errors[key]}</Alert>
        )
      }
    </>

  )
}
