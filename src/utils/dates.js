import { parseISO, format, getMonth, formatISO } from 'date-fns'
import { el } from 'date-fns/locale'

// ---------------------------------------------------------------------
// Parse iso formated date into Date()
// ---------------------------------------------------------------------
export const parseDate = (isoDate) => {
  if (!isoDate) return null
  var d = parseISO(isoDate)
  if (d == 'Invalid Date') return null
  else return d
}

// ---------------------------------------------------------------------
// Format date to dd/mm/yyyy
// Should be in iso format
// ---------------------------------------------------------------------
export const formatDate = (isoDate, delimeter = '/') => {
  if (!isoDate) return '';
  return format(parseISO(isoDate, {locale: el}), `dd${delimeter}MM${delimeter}yyyy`);
}

// ---------------------------------------------------------------------
// Format iso date into HH:Mm
// ---------------------------------------------------------------------
export const formatTime = (isoDate) => {
  return format(parseISO(isoDate, { locale: el }), 'HH:mm');
}

// ---------------------------------------------------------------------
// Format iso datetime into dd/mm/yyyy, HH:Mm
// ---------------------------------------------------------------------
export const formatDateTime = (isoDate, wrap = false) => {
  if (!isoDate) return ''
  return format(parseISO(isoDate, { locale: el }), 'dd/MM/yyyy, HH:mm');
}

// ---------------------------------------------------------------------
// Format date-fns date into dd/mm/yyyy
// ---------------------------------------------------------------------
export const formatFnsDate = (fnsDate) => {
  return format(fnsDate, 'dd/MM/yyyy')
}

// ---------------------------------------------------------------------
// Format date-fns date into yyyy-mm-dd
// for database store
// ---------------------------------------------------------------------
export const formatFnsDbDate = (fnsDate) => {
  return format(fnsDate, 'yyyy-MM-dd', { locale: el })
}

// ---------------------------------------------------------------------
// Format date-fns date into yyyy-mm-dd HH:mm
// for database store
// ---------------------------------------------------------------------
export const formatFnsDbDatetime = (fnsDate) => {
  if (!fnsDate) return null
  return format(fnsDate, 'yyyy-MM-dd HH:mm', { locale: el })
}

// ---------------------------------------------------------------------
// Format date-fns date into Δευτέρα, 6 Απριλίου 2022
// ---------------------------------------------------------------------
export const formatFnsFullDate = (fnsDate) => {
  const month = getMonth(fnsDate)
  return format(fnsDate, `eeee, d ${genikiOfMonth[month]} yyyy`, { locale: el })
}

// ---------------------------------------------------------------------
// Get ISO format
// ---------------------------------------------------------------------
export const toISOString = (fnsDate) => {
  if (!fnsDate) return ''
  return formatISO(fnsDate)
}


