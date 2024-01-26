// ---------------------------------------------------------------------------------------
// Default column values - merged with prop.columns
// ---------------------------------------------------------------------------------------
export const defaultColumnValues = {
  id: '',
  label: '',
  enableSorting: true,
  enableFilter: true,
  filterType: 'text',   // text || integer || select || autocomplete
  filterValueKey: 'id', // when filter type is autocomplete
  filterLabelKey: 'label', // when filter type is autocomplete
  filterMark: '999999',  // When filter type == integer
  filterPlaceholder: 'Αναζήτηση',
  filterOptions: [],    // when filterType == select
  style: null,
  width: '',
  minWidth: '',
  render: null,   //(row => jsx)
}