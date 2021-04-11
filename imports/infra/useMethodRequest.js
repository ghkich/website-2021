import {useEffect, useState} from 'react'
import {WorkExperiencesMethodRequests} from '../api/work-experiences'
import {GitHubMethodRequests} from '../api/github'
import {methodCall} from './methodCall'
import {ShortBioMethodRequests} from '../api/short-bio'
import {ContactInfoMethodRequests} from '../api/contact-info'

const AllMethodRequests = [
  WorkExperiencesMethodRequests,
  GitHubMethodRequests,
  ShortBioMethodRequests,
  ContactInfoMethodRequests,
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

  const [data, setData] = useState([])
  const [status, setStatus] = useState(RequestStatuses.IDLE)

  const run = async (params) => {
    try {
      setStatus(RequestStatuses.LOADING)
      const response = await methodCall(requestName, params)
      setStatus(RequestStatuses.SUCCESS)
      setData(response)
      options.onSuccess(response)
    } catch (error) {
      console.error(error)
      setStatus(RequestStatuses.ERROR)
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
