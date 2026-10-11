import React from 'react'
import { TextInput } from './TextInput'
import { TableContext } from './TableContext'
import { myDebounce } from '../../utils'

const GlobalFilter = () => {

  // ---------------------------------------------------------------------------------------
  // Context data
  // ---------------------------------------------------------------------------------------
  const { state, props, api } = React.useContext(TableContext)
  const apiRef = React.useRef(api.handleGlobalFilterChange)

  React.useEffect(() => {
    apiRef.current = api.handleGlobalFilterChange
  }, [api.handleGlobalFilterChange])

  // Create a stable debounced function so the timer persists
  const debouncedGlobalChange = React.useMemo(() =>
    myDebounce((value) => {
      apiRef.current(value)
    }, 300),
    [])

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