export const fetchFromSource = (url) =>
  new Promise((resolve, reject) =>
    fetch(url)
      .then((data) => {
        if (!data) throw new Error('No data fetched')
        return data.json()
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error)),
  )
