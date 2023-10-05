export const isEmpty = (value) => {
  return value === null || value === undefined || value === ''
}

export const notEmpty = (value) => {
  return value !== null && value !== undefined && value !== ''
}