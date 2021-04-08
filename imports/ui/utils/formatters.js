export const formatDate = (stringDate) => {
  if (!stringDate) return
  const date = new Date(stringDate)
  const options = {year: 'numeric', month: 'short'}
  const formattedDate = Intl.DateTimeFormat('en-US', options).format(date)
  return formattedDate
}
