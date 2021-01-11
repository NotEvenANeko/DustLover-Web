import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import axios from '@/utils/axios'
import { decodeQuery } from '@/utils'

interface FetchParams {
  requestURL: string,
  queryParams?: LooseObj,
  withLoading: boolean,
  fetchDependence?: any[],
  pagination: boolean
}

const useFetch = (args: FetchParams) => {

  const location = useLocation()
  const history = useHistory()

  
}