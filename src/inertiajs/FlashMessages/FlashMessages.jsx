import React from 'react'
import { Alert } from '@mui/material'
import { usePage } from '@inertiajs/react'
import { ShowErrors } from '../../core/ShowErrors'

export const FlashMessages = () => {

  const { flash, errors } = usePage().props

  return (
    <>
      <ShowErrors errors={errors} />
      {
        Object.keys(flash).map((key, index) => {
          if (!flash[key]) {
            return null
          }
          else {
            return <Alert sx={{ marginBottom: 3 }} key={index} severity={key}>{flash[key]}</Alert>
          }
        })
      }
    </>
  )
}
