import React from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker, renderDigitalClockTimeView } from '@mui/x-date-pickers'
import el from 'date-fns/locale/el'
import { Controller } from 'react-hook-form'
import { toDate } from 'date-fns'

export const MyTimeField = ({
  form,
  name,
  label,
  ampm = false,	// if false show 24 hours
  hoursStep = 1,
  minutesStep = 15,
  secondsStep = 30,
  singleTimeColumn = true,
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
  // view based on singleTimeColumn prop
  // ---------------------------------------------------------------------------------------
  const views = () => {
    if (singleTimeColumn) {
      return ["hours"]
    }
    else {
      return ["hours", "minutes"]
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
          <TimePicker
            label={label}
            value={field.value ? toDate(field.value) : null}
            format='HH:mm'
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

