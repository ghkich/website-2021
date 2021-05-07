/**
 * @param {string} dateString
 * @param {{month: string, year: string, day: string}=} options
 * @returns {string}
 */
export const formatDate = (dateString, options) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const formatOptions = options ? options : {year: 'numeric', month: 'short'}
  return Intl.DateTimeFormat('en-US', formatOptions).format(date)
}
