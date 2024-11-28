import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import axios from 'axios'
import { Controller } from 'react-hook-form'
import { myDebounce } from '../utils'

export const MyAutocompleteApiField = ({
	form,
	name,
	label,
	optionsUrl,
	renderOption = null,
	valueKey = 'id',
	labelKey = 'label',
	minChars = 2,
	required = false,
	disabled = false,
	maxLength = 255,
	autofocus = false,
	loadingText = 'Ανάκτηση...',
	noOptionsText = 'Δεν υπάρχουν επιλογές',
	placeholder = '',
	size = 'medium',
	onChange: onChangeProp = null,
	...props
}) => {

	// ---------------------------------------------------------------------------------------
	// State
	// ---------------------------------------------------------------------------------------
	const [localValue, setLocalValue] = React.useState(null)
	const [options, setOptions] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [inputText, setInputText] = React.useState('')

	const formValue = form.watch(name)

	// ---------------------------------------------------------------------------------------
	// Destructure form fiels
	// ---------------------------------------------------------------------------------------
	const { control, formState } = form
	const { errors } = formState

	React.useState(() => {
		if (options.length === 0 && formValue) {
			async function fetch() {
				setLoading(true)
				const response = await axios.get(`${optionsUrl}?id=${formValue}`)
				setOptions(response.data)
				setLocalValue(response.data.find(option => option[valueKey] === formValue) || null)
				setLoading(false)
			}
			fetch()
		}
	}, [])

	// ---------------------------------------------------------------------------------------
	// Update localValue on form value changed
	// ---------------------------------------------------------------------------------------
	React.useEffect(() => {
		setLocalValue(options.find(option => option[valueKey] === formValue) || null)
	}, [formValue])

	// ---------------------------------------------------------------------------------------
	// fetch options on input change
	// ---------------------------------------------------------------------------------------
	// React.useEffect(() => {
	// 	fetchOptions()
	// }, [inputText])



	// ---------------------------------------------------------------------------------------
	// Input change handler
	// ---------------------------------------------------------------------------------------
	const handleInputChange = (_, newValue) => {
		setInputText(newValue)
	}


	// ---------------------------------------------------------------------------------------
	// fetch function
	// ---------------------------------------------------------------------------------------
	const fetchOptions = async () => {
		// inputValue should be at least minChars long
		if (inputText.length < minChars) {
			setOptions([])
			setLoading(false)
			return
		}

		// Fetch options
		setLoading(true)
		const response = await axios.get(`${optionsUrl}?token=${inputText}`)
		form.setValue(name, null)
		setOptions(response.data)
		setLoading(false)
	}


	// ---------------------------------------------------------------------------------------
	// JSX
	// ---------------------------------------------------------------------------------------

	return (
		<Controller
			name={name}
			control={control}
			rules={{
				required: required,
				disabled: disabled
			}}
			render={({ field: { onChange, onBlur, value } }) => (
				<Autocomplete
					value={localValue}
					options={options}
					onInputChange={myDebounce(handleInputChange, 300)}
					onChange={(_, newValue) => {
						onChange(newValue ? newValue[valueKey] : null)
						onChangeProp && (newValue ? onChangeProp(newValue[valueKey]) : onChangeProp(null))
					}}
					isOptionEqualToValue={(option, value) => option[valueKey] === value[valueKey]}
					getOptionLabel={(option) => option[labelKey]}
					filterOptions={x => x}
					noOptionsText={noOptionsText}
					loadingText={loadingText}
					loading={loading}
					required={required}
					size={size}
					renderInput={
						(params) => (
							<TextField
								label={label}
								required={required}
								disabled={disabled}
								autoFocus={autofocus}
								placeholder={placeholder}
								inputProps={{ maxLength: maxLength }}
								error={Boolean(errors[name]?.message)}
								onBlur={onBlur}
								variant="outlined"
								fullWidth={true}
								helperText={errors[name]?.message}
								size={size}
								{...params}
								{...props}
							/>
						)
					}
					renderOption={
						(props, option, state) => (
							renderOption
								?
								renderOption(props, option, state)
								:
								<li {...props} key={option[valueKey]}>
									{option[labelKey]}
								</li>
						)
					}
				/>
			)}
		/>
	)
}
