import { isEmpty } from "./values";

// ---------------------------------------------------------------------------------------
// format integer
// ---------------------------------------------------------------------------------------
export const formatInteger = (number) => {
  if (!number) return 0
  return parseInt(number).toLocaleString();
}

// ---------------------------------------------------------------------------------------
// format currency
// ---------------------------------------------------------------------------------------
export const formatCurrency = (num) => {
  if (isEmpty(num)) return ''
  const formatter = new Intl.NumberFormat('el-GR', {
    style: 'currency',
    currency: 'EUR'
  })
  return formatter.format(num)
}

// ---------------------------------------------------------------------------------------
// format float
// ---------------------------------------------------------------------------------------
export const formatFloat = (num, decimals = 2) => {
  if (isEmpty(num)) return
  const formatter = new Intl.NumberFormat('el-GR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
  return formatter.format(num)
}

