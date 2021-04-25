export const shouldUpdateCollection = (data, hours = 1) => {
  const delayTime = hours * 60 * 1000 // x hours * 60 min * 1000 milliseconds
  const today = new Date().getTime()
  const lastUpdate = new Date(data?.updatedAt || new Date()).getTime()

  // TODO: remove data condition after initialize data
  return !data || today > lastUpdate + delayTime
}
