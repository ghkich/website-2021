import React, {createContext, useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'

const AppStatuses = {
  START: 'start',
  LOADING: 'loading',
  CONTENT_READY: 'content-ready',
  READY: 'ready',
}

const INITIAL_STATE = {
  loaders: [],
  status: AppStatuses.START,
}

const AppContext = createContext(INITIAL_STATE)

export const AppProvider = ({children}) => {
  const [state, setState] = useState(INITIAL_STATE)

  useEffect(() => {
    const {loaders, status} = state

    if (status === AppStatuses.START && loaders.length > 0) {
      setState((prev) => ({...prev, status: AppStatuses.LOADING}))
    }

    if (status === AppStatuses.LOADING && loaders.length === 0) {
      setState((prev) => ({...prev, status: AppStatuses.CONTENT_READY}))
    }
  }, [state])

  const actions = {
    addLoader: (loader) =>
      setState((prev) => {
        if (!prev.loaders.includes(loader)) {
          return {...prev, loaders: [...prev.loaders, loader]}
        }
        return prev
      }),
    removeLoader: (loader) =>
      setState((prev) => {
        const loaders = prev.loaders?.filter((prevLoader) => prevLoader !== loader)
        return {...prev, loaders}
      }),
    setAppReady: () => setState((prev) => ({...prev, status: AppStatuses.READY})),
  }

  return <AppContext.Provider value={{state, actions}}>{children}</AppContext.Provider>
}

AppProvider.propTypes = {
  children: PropTypes.node,
}

export const useAppContext = () => useContext(AppContext)

export const useAppSelectors = () => {
  const {state} = useAppContext()

  return {
    contentReady: state.status === AppStatuses.CONTENT_READY || state.status === AppStatuses.READY,
    appReady: state.status === AppStatuses.READY,
  }
}
