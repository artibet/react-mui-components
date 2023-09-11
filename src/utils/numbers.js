// ---------------------------------------------------------------------------------------
// 
// ---------------------------------------------------------------------------------------
export const formatInteger = (number) => {
  if (!number) return 0
  return parseInt(number).toLocaleString();
}

// ---------------------------------------------------------------------------------------
// 
// ---------------------------------------------------------------------------------------
export const formatCurrency = (num) => {
  const formatter = new Intl.NumberFormat('el-GR', {
    style: 'currency',
    currency: 'EUR'
  })
  return formatter.format(num)
}