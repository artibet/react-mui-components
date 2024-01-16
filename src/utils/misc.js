// ---------------------------------------------------------------------------------------
// Check if object exists in array of objects
// Checking is on id param
// ---------------------------------------------------------------------------------------
export const objectInArray = (obj, arr, id = 'id') => {
  return Boolean(arr.find(item => item[id] === obj[id]))
}