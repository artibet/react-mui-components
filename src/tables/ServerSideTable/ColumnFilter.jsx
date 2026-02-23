import React from 'react'
import { TextInput } from './TextInput'
import { myDebounce } from '../../utils'
import { TableContext } from './TableContext'
import { IntegerInput } from './IntegerInput'
import { SelectInput } from './SelectInput'
import { AutocompleteInput } from './AutocompleteInput'

const ColumnFilter = ({ column }) => {

  // ---------------------------------------------------------------------------------------
  // Context data
  // ---------------------------------------------------------------------------------------
  const { api, props } = React.useContext(TableContext)

  const filterValue = api.getColumnFilter(column)

  // 1. Create a stable debounced function
  // We use useCallback so it persists across renders
  const debouncedFilterChange = React.useCallback(
    myDebounce((col, val) => {
      api.handleColumnFilterChange(col, val)
    }, 300),
    [api] // Only recreate if the api object changes
  )

  // type == text
  if (column.filterType === 'text') {
    return (
      <TextInput
        activeColor={props.filterActiveColor}
        inactiveColor={props.filterInactiveColor}
        initialValue={filterValue}
        onChange={(value) => debouncedFilterChange(column, value)}
        placeholder={column.filterPlaceholder}
      />
    )
  }

  // type == integer
  if (column.filterType === 'integer') {
    return (
      <IntegerInput
        activeColor={props.filterActiveColor}
        inactiveColor={props.filterInactiveColor}
        initialValue={filterValue}
        mask={column.filterMask}
        onChange={(value) => debouncedFilterChange(column, value)}
        placeholder={column.filterPlaceholder}
      />
    )
  }

  // type == autocomplete
  if (column.filterType === 'autocomplete') {
    return (
      <AutocompleteInput
        activeColor={props.filterActiveColor}
        inactiveColor={props.filterInactiveColor}
        value={filterValue}
        valueKey={column.filterValueKey}
        labelKey={column.filterLabelKey}
        onChange={(value) => api.handleColumnFilterChange(column, value)}
        placeholder={column.filterPlaceholder}
        options={column.filterOptions}
      />
    )
  }

  // type == select
  if (column.filterType === 'select') {
    return (
      <SelectInput
        activeColor={props.filterActiveColor}
        inactiveColor={props.filterInactiveColor}
        value={filterValue}
        onChange={(value) => api.handleColumnFilterChange(column, value)}
        placeholder={column.filterPlaceholder}
        options={column.filterOptions}
      />
    )
  }

  // Not supported
  return null

}

export default ColumnFilter