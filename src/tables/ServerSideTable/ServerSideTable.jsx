import { Box, Table, TableBody, TableContainer, TableHead, TablePagination, } from '@mui/material'
import React from 'react'
import GlobalFilter from './GlobalFilter'
import { useLoader } from '../../hooks'
import Title from './Title'
import CreateButton from './CreateButton'
import GlobalActions from './GlobalActions'
import TableHeader from './TableHeader'
import axios from 'axios'
import { Row } from './Row'
import { defaultColumnValues } from './defaultColumnValues'
import { TableContext } from './TableContext'

// ---------------------------------------------------------------------------------------
// Default pagination
// ---------------------------------------------------------------------------------------
const defaultPageIndex = 0
const defaultPageSize = 10

// ---------------------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------------------
const defaultData = {
  data: [],
  page: 0,
  page_size: 10,
  total: 0
}

// ---------------------------------------------------------------------------------------
// DataTable component
// ---------------------------------------------------------------------------------------
export const ServerSideTable = React.forwardRef(({
  title,
  titleStyle = {},
  rowStyle = null,             // (row) => {}
  cellStyle = null,          // (row) => {}
  tableSize = 'medium',
  columns,
  dataUrl,
  hasQueryParams = false,   // if data url has already some query parameters - start with & otherwise with ?
  enableGlobalFilter = false,
  enableColumnFilters = false,
  globalFilterPlaceholder = 'Καθολική Αναζήτηση',
  enableCreateRow = false,
  createButtonVariant = 'contained',
  createButtonTooltip = 'Νέα Εγγραφή',
  onCreateRow = null,
  rowsClickable = false,
  onRowClick = null,
  globalActions = [],
  rowActions = [],
  keepState = true,
  stateKey = null,
  filterActiveColor = '#D4F7F4',
  filterInactiveColor = 'white',
  defaultSorting = []
}, ref) => {

  // ---------------------------------------------------------------------------------------
  // session keys
  // ---------------------------------------------------------------------------------------
  const pageIndexKey = React.useMemo(() => {
    if (!keepState || !stateKey) return false // not keeping state
    return `${stateKey}.pageIndex`
  }, [])

  const pageSizeKey = React.useMemo(() => {
    if (!keepState || !stateKey) return false // not keeping state
    return `${stateKey}.pageSize`
  }, [])

  const sortingKey = React.useMemo(() => {
    if (!keepState || !stateKey) return false // not keeping state
    return `${stateKey}.sorting`
  }, [])

  const globalFilterKey = React.useMemo(() => {
    if (!keepState || !stateKey) return false // not keeping state
    return `${stateKey}.globalFilter`
  }, [])

  const columnFiltersKey = React.useMemo(() => {
    if (!keepState || !stateKey) return false // not keeping state
    return `${stateKey}.columnFilters`
  }, [])

  // ---------------------------------------------------------------------------------------
  // Merged columns with defaults
  // ---------------------------------------------------------------------------------------
  const mergedColumns = React.useMemo(() => {
    return columns.map(column => {
      return { ...defaultColumnValues, ...column }
    })
  })

  // ---------------------------------------------------------------------------------------
  // Table state
  // ---------------------------------------------------------------------------------------
  const [data, setData] = React.useState(defaultData)

  const [sorting, setSorting] = React.useState(sortingKey ? JSON.parse(sessionStorage.getItem(sortingKey)) || defaultSorting : defaultSorting)
  const [globalFilter, setGlobalFilter] = React.useState(globalFilterKey ? sessionStorage.getItem(globalFilterKey) || '' : '')
  const [columnFilters, setColumnFilters] = React.useState(columnFiltersKey ? JSON.parse(sessionStorage.getItem(columnFiltersKey)) || [] : [])
  const [pageIndex, setPageIndex] = React.useState(pageIndexKey ? parseInt(sessionStorage.getItem(pageIndexKey)) || defaultPageIndex : defaultPageIndex)
  const [pageSize, setPageSize] = React.useState(pageSizeKey ? parseInt(sessionStorage.getItem(pageSizeKey)) || defaultPageSize : defaultPageSize)

  const { startLoader, stopLoader } = useLoader()

  // ---------------------------------------------------------------------------------------
  // Fetch data from api
  // ---------------------------------------------------------------------------------------
  const fetchData = (pageIndexArg, pageSizeArg, sortingArg, globalFilterArg, columnFiltersArg) => {
    startLoader()

    // If dataUrl has already some query parames, first character is &
    // otherwise first character is ?

    const firstChar = hasQueryParams ? '&' : '?'

    // Send request
    axios.get(`${dataUrl}${firstChar}page=${pageIndexArg + 1}&pageSize=${pageSizeArg}&sorting=${JSON.stringify(sortingArg)}&globalFilter=${globalFilterArg}&columnFilters=${JSON.stringify(columnFiltersArg)}`)
      .then(response => {
        setData(response.data)
        stopLoader()
      })
      .catch(error => {
        console.log(error.message)
        stopLoader()
      })
  }

  // ---------------------------------------------------------------------------------------
  // Ref callbacks
  // ---------------------------------------------------------------------------------------
  React.useImperativeHandle(ref, () => ({
    updateRow: (row) => {
      setData(prevData => prevData.map(item => item.id === row.id ? row : item))
    }
  }))

  // ---------------------------------------------------------------------------------------
  // toggle sorting status of column
  // asc -> desc -> none
  // ---------------------------------------------------------------------------------------
  const toggleSorting = (e, column) => {

    setSorting(old => {

      const item = old.find(x => x.id === column.id)

      let newSorting = []

      // Is not in sorting add it with desc == false
      if (!item) {
        // if shift key is pressed keep others 
        // else make it the only one
        if (e.altKey) {
          newSorting = [...old, { id: column.id, desc: false }]
        }
        else {
          newSorting = [{ id: column.id, desc: false }]
        }
      }

      else {
        // exists
        // if no shift rotate sorting (desc:false->desc:true->remove)
        const newDescStatus = !item.desc
        if (newDescStatus) {
          if (e.altKey) { // replace with new desc status
            newSorting = [...old.filter(x => x.id !== column.id), { id: column.id, desc: true }]
          }
          else {  // keep only this with new desc status
            newSorting = [{ id: column.id, desc: true }]
          }
        }
        else { // remove it
          if (e.altKey) {
            newSorting = [...old.filter(x => x.id !== column.id)]
          }
          else {
            newSorting = []
          }
        }
      }

      // fetch data with new sorting
      setPageIndex(0)
      fetchData(0, pageSize, newSorting, globalFilter, columnFilters)
      return newSorting


    })

  }

  // ---------------------------------------------------------------------------------------
  // Get column sorting status
  // ---------------------------------------------------------------------------------------
  const getSortingStatus = (column) => {
    const item = sorting.find(x => x.id === column.id)
    if (!item) return null
    if (item.desc) return 'desc'
    else return 'asc'
  }

  // ---------------------------------------------------------------------------------------
  // Handle pageIndex change
  // ---------------------------------------------------------------------------------------
  const handlePageIndexChange = (newIndex) => {
    setPageIndex(newIndex)
    fetchData(newIndex, pageSize, sorting, globalFilter, columnFilters)
  }

  // ---------------------------------------------------------------------------------------
  // Handle pageSize change
  // ---------------------------------------------------------------------------------------
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize)
    setPageIndex(0)
    fetchData(0, newSize, sorting, globalFilter, columnFilters)
  }

  // ---------------------------------------------------------------------------------------
  // Handle global filter changed
  // ---------------------------------------------------------------------------------------
  const handleGlobalFilterChange = (newGlobalFilter) => {
    setGlobalFilter(newGlobalFilter)
    setPageIndex(0)
    fetchData(0, pageSize, sorting, newGlobalFilter, columnFilters)
  }

  // ---------------------------------------------------------------------------------------
  // Get filter of particular column
  // ---------------------------------------------------------------------------------------
  const getColumnFilter = (column) => {
    const filter = columnFilters.find(x => x.id === column.id)
    if (!filter) {
      return ''
    }
    else {
      return filter.value
    }
  }

  // ---------------------------------------------------------------------------------------
  // Handle column filters change
  // ---------------------------------------------------------------------------------------
  const handleColumnFilterChange = (column, value) => {
    setColumnFilters(old => {

      const item = old.find(x => x.id === column.id)

      let newColumnFilters = []

      // if not in columnFilters add it
      if (!item) {
        newColumnFilters = [...old, { id: column.id, value: value }]
      }
      else {
        // if value = '' remove it
        if (!value) {
          newColumnFilters = [...old.filter(x => x.id !== column.id)]
        }
        else {
          // replace in columnFilters
          newColumnFilters = [...old.filter(x => x.id !== column.id), { id: column.id, value: value }]
        }
      }

      // fetch data with new column filter
      setPageIndex(0)
      fetchData(0, pageSize, sorting, globalFilter, newColumnFilters)
      return newColumnFilters

    })
  }

  // ---------------------------------------------------------------------------------------
  // Exported context
  // ---------------------------------------------------------------------------------------
  const contextData = {
    props: {
      title,
      titleStyle,
      rowStyle,
      cellStyle,
      tableSize,
      columns,
      dataUrl,
      hasQueryParams,
      enableGlobalFilter,
      enableColumnFilters,
      globalFilterPlaceholder,
      enableCreateRow,
      createButtonVariant,
      createButtonTooltip,
      onCreateRow,
      rowsClickable,
      onRowClick,
      globalActions,
      rowActions,
      keepState,
      stateKey,
      filterActiveColor,
      filterInactiveColor,
      defaultSorting,
    },
    state: {
      data,
      columns: mergedColumns,   // merge props.columns with default values
      setData,
      sorting,
      setSorting,
      globalFilter,
      setGlobalFilter,
      columnFilters,
      setColumnFilters,
      pageIndex,
      setPageIndex,
      pageSize,
      setPageSize
    },
    api: {
      toggleSorting,
      getSortingStatus,
      handleGlobalFilterChange,
      getColumnFilter,
      handleColumnFilterChange
    }
  }

  // ---------------------------------------------------------------------------------------
  // Fetch data on mount
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    fetchData(pageIndex, pageSize, sorting, globalFilter, columnFilters)
  }, [])

  // ---------------------------------------------------------------------------------------
  // Keep to session when state changes
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    pageIndexKey && sessionStorage.setItem(pageIndexKey, pageIndex)
  }, [pageIndex])

  React.useEffect(() => {
    pageSizeKey && sessionStorage.setItem(pageSizeKey, pageSize)
  }, [pageSize])

  React.useEffect(() => {
    sortingKey && sessionStorage.setItem(sortingKey, JSON.stringify(sorting))
  }, [sorting])

  React.useEffect(() => {
    globalFilterKey && sessionStorage.setItem(globalFilterKey, globalFilter)
  }, [globalFilter])

  React.useEffect(() => {
    columnFiltersKey && sessionStorage.setItem(columnFiltersKey, JSON.stringify(columnFilters))
  }, [columnFilters])


  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <>
      <TableContext.Provider value={contextData}>

        {/* Title, globalFilter, createButton, globalActions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
          <Title />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end', alignItems: 'center' }}>
            <GlobalFilter />
            <CreateButton />
            <GlobalActions />
          </Box>
        </Box>

        {/* Create the table */}
        <TableContainer>
          <Table size={tableSize}>
            <TableHead>
              <TableHeader />
            </TableHead>
            <TableBody>
              {data.data.map(row => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </TableContext.Provider>

      <TablePagination
        sx={{ marginTop: 1, overflow: 'hidden' }}
        component="div"
        showFirstButton
        showLastButton
        count={parseInt(data.total)}
        page={data.page != 0 ? data.page - 1 : 0}
        rowsPerPage={data.page_size}
        onPageChange={(e, page) => handlePageIndexChange(page)}
        onRowsPerPageChange={e => handlePageSizeChange(e.target.value)}
        labelDisplayedRows={props => `${props.from} έως ${props.to} από ${props.count}`}
        labelRowsPerPage='Εγγραφές ανά σελίδα'
      />
    </>
  )
})
