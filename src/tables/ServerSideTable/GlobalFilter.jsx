import React from 'react'
import { TextInput } from './TextInput'
import { TableContext } from './TableContext'
import { myDebounce } from '../../utils'

const GlobalFilter = () => {

  // ---------------------------------------------------------------------------------------
  // Context data
  // ---------------------------------------------------------------------------------------
  const { state, props, api } = React.useContext(TableContext)

  // Create a stable debounced function so the timer persists
  const debouncedGlobalChange = React.useCallback(
    myDebounce((value) => {
      api.handleGlobalFilterChange(value)
    }, 300),
    [api] // Only recreate if api changes (which usually only happens on mount)
  )

  if (!props.enableGlobalFilter) return null

  return (
    <TextInput
      initialValue={state.globalFilter}
      onChange={debouncedGlobalChange}
      placeholder={props.globalFilterPlaceholder}
    />
  )
}

export default GlobalFilter