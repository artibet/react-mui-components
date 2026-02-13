import React from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker, renderDigitalClockTimeView } from '@mui/x-date-pickers'
import el from 'date-fns/locale/el'
import { Controller } from 'react-hook-form'
import { toDate } from 'date-fns'

export const MyDatetimeField = ({
  form,
  name,
  label,
  required = false,
  disabled = false,
  autofocus = false,
  showErrors = true,
  ampm = false,	// if false show 24 hours
  singleTimeColumn = true,
  hoursStep = 1,
  minutesStep = 15,
  secondsStep = 30,
  ...props
}) => {

  // ---------------------------------------------------------------------------------------
  // Destructure form fiels
  // ---------------------------------------------------------------------------------------
  const { control, formState } = form
  const { errors } = formState

  // ---------------------------------------------------------------------------------------
  // view based on singleTimeColumn prop
  // ---------------------------------------------------------------------------------------
  const views = () => {
    if (singleTimeColumn) {
      return ["year", "month", "day", "hours"]
    }
    else {
      return ["year", "month", "day", "hours", "minutes"]
    }

  }

  // ---------------------------------------------------------------------------------------
  // viewRenderers base on singleTimeColumn prop
  // ---------------------------------------------------------------------------------------
  const viewRenderers = () => {
    if (singleTimeColumn) {
      return {
        hours: renderDigitalClockTimeView,
      }
    }
    else {
      return null
    }
  }

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
        fieldHoursPlaceholder: _ => 'ΩΩ',
        fieldMinutesPlaceholder: _ => 'ΛΛ',
        fieldClearLabel: 'Καθαρισμός',
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
          <DateTimePicker
            label={label}
            value={field.value ? toDate(field.value) : null}
            format='dd/MM/yyyy HH:mm'
            inputFormat
            views={views()}
            ampm={ampm}
            onChange={newValue => field.onChange(newValue)}
            viewRenderers={viewRenderers()}
            timeSteps={{
              hours: hoursStep,
              minutes: minutesStep,
              seconds: secondsStep,
            }}
            slotProps={{
              field: {
                clearable: true,
                onClear: () => field.onChange(null),
              },
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


