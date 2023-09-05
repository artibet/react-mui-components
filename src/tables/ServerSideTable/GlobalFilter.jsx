import React from 'react'
import { TextInput } from './TextInput'
import { TableContext } from './TableContext'
import { myDebounce } from '../../utils'

const GlobalFilter = () => {

  // ---------------------------------------------------------------------------------------
  // Context data
  // ---------------------------------------------------------------------------------------
  const { state, props, api } = React.useContext(TableContext)

  if (!props.enableGlobalFilter) return null

  return (
    <TextInput
      initialValue={state.globalFilter}
      onChange={myDebounce(api.handleGlobalFilterChange, 300)}
      placeholder={props.globalFilterPlaceholder}
    />
  )
}

export default GlobalFilter