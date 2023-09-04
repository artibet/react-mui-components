// ---------------------------------------------------------------------
// Format integer with thousands separator
// ---------------------------------------------------------------------
export const formatInteger = (number) => {
  if (!number) return 0
  return parseInt(number).toLocaleString();
}