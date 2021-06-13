import {useEffect, useState} from 'react'
import {WorkExperiencesMethodRequests} from '../api/work-experiences'
import {GitHubMethodRequests} from '../api/github'
import {methodCall} from './methodCall'
import {ShortBioMethodRequests} from '../api/short-bio'
import {BlogMethodRequests} from '../api/blog'
import {fetchApi} from './fetchApi'
import {SkillsMethodRequests} from '../api/skills'
import {useAppContext} from '../ui/app/AppContext'
import {WorldMapMethodRequests} from '../api/world-map'

const AllMethodRequests = [
  WorkExperiencesMethodRequests,
  GitHubMethodRequests,
  ShortBioMethodRequests,
  SkillsMethodRequests,
  WorldMapMethodRequests,
  BlogMethodRequests,
]

const RequestStatuses = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

export const useMethodRequest = (requestName, opt) => {
  if (!AllMethodRequests.some((item) => Object.values(item).some((value) => value === requestName))) {
    throw new Error(`Not a valid method requestName`)
  }

  const options = {manual: false, onSuccess: () => {}, ...opt}

  const {actions} = useAppContext()

  const [data, setData] = useState()
  const [status, setStatus] = useState(RequestStatuses.IDLE)

  const handleError = (error) => {
    console.error(error)
    setStatus(RequestStatuses.ERROR)
  }

  const run = async (params) => {
    try {
      setStatus(RequestStatuses.LOADING)
      actions.addLoader(requestName)
      let response = await methodCall(requestName, params)
      if (options.updateCollection) {
        const {validate, sourceDataUrl, updateRequestName} = options.updateCollection
        if (!validate || !sourceDataUrl || !updateRequestName) {
          handleError(`updateCollection is missing some config`)
          return
        }
        if (validate(response)) {
          try {
            const sourceData = await fetchApi(sourceDataUrl)
            await methodCall(updateRequestName, {id: response?._id, data: sourceData})
            response = await methodCall(requestName, params)
          } catch (error) {
            console.error(`Error while trying to updateCollection ${updateRequestName}: ${error}`)
          }
        }
      }
      setStatus(RequestStatuses.SUCCESS)
      setData(response)
      options.onSuccess(response)
    } catch (error) {
      handleError(error)
    } finally {
      actions.removeLoader(requestName)
    }
  }

  useEffect(() => {
    if (!options.manual) {
      run(options.with)
    }
  }, [options.manual])

  return {
    data,
    status,
    loading: status === RequestStatuses.LOADING,
    run,
  }
}
