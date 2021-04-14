export const fetchApi = (url, options) => {
  return new Promise((resolve, reject) =>
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error)),
  )
}
