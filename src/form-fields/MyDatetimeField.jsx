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
          <DateTimePicker
            label={label}
            value={field.value ? toDate(field.value) : null}
            format='dd/MM/yyyy HH:mm'
            inputFormat
            views={["year", "month", "day", "hours", "minutes"]}
            ampm={ampm}
            onChange={newValue => field.onChange(newValue)}
            slotProps={{
              textField: {
                ...props,
                required: required,
                error: showErrors && Boolean(errors[name]?.message),
                helperText: showErrors && errors[name]?.message,
                variant: 'outlined',
                fullWidth: true,
              }
            }}
          />
        )}
      />
    </LocalizationProvider >



    // <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={el}>
    // 	<Controller
    // 		name={name}
    // 		control={control}
    // 		rules={{
    // 			required: required,
    // 			disabled: disabled
    // 		}}
    // 		render={({ field }) => (
    // 			<DateTimePicker
    // 				label={label}
    // 				format={format}
    // 				value={field.value}
    // 				views={["year", "month", "day", "hours", "minutes"]}
    // 				// viewRenderers={{
    // 				// 	hours: renderDigitalClockTimeView,
    // 				// 	minutes: renderDigitalClockTimeView
    // 				// }}
    // 				ampm={ampm}
    // 				onChange={field.onChange}
    // 				disabled={disabled}
    // 				slots={{
    // 					textField: params =>
    // 						<TextField {...params}
    // 							required={required}
    // 							error={showErrors && Boolean(errors[name]?.message)}
    // 							helperText={showErrors && errors[name]?.message}
    // 							variant="outlined"
    // 							fullWidth={true}
    // 							{...props}
    // 						/>,
    // 				}}
    // 			/>
    // 		)}
    // 	/>
    // </LocalizationProvider>
  )
}


