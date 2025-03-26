import React from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers'
import el from 'date-fns/locale/el'
import { Controller } from 'react-hook-form'
import { toDate } from 'date-fns'

export const MyDateField = ({
  form,
  name,
  label,
  required = false,
  disabled = false,
  autofocus = false,
  showErrors = true,
  ...props
}) => {

  // ---------------------------------------------------------------------------------------
  // Destructure form fiels
  // ---------------------------------------------------------------------------------------
  const { control, formState } = form
  const { errors } = formState

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={el}
      localeText={{
        fieldDayPlaceholder: _ => 'ΗΗ',
        fieldMonthPlaceholder: _ => 'ΜΜ',
        fieldYearPlaceholder: _ => 'EEEE',
      }}
    >
      <Controller
        name={name}
        control={control}
        rules={{
          required: required,
          disabled: disabled
        }}
        render={({ field }) => (
          <DatePicker
            label={label}
            value={field.value ? toDate(field.value) : null}
            format='dd/MM/yyyy'
            inputFormat
            onChange={newValue => field.onChange(newValue)}
            slotProps={{
              textField: {
                ...props,
                required: required,
                error: showErrors && Boolean(errors[name]?.message),
                helperText: showErrors && errors[name]?.message,
                variant: 'outlined',
                fullWidth: true,
              },
            }}
          />
        )}
      />
    </LocalizationProvider >
  )
}

