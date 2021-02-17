import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import axios from '@/utils/axios'
import { decodeQuery } from '@/utils'

interface PaginationState {
  on: boolean,
  current: number,
  pageSize: number,
  total: number
}

interface FetchParams {
  requestURL: string
  queryParams?: LooseObj
  fetchDependence?: any[]
  bus?: any
  deltaUpd?: boolean
  loadStep?: number
}

interface ReturnPagination extends PaginationState {
  onChange: Function
}

interface ReturnObj<T> {
  data: T[],
  loading: LoadingState,
  count: number,
  pagination?: ReturnPagination,
  onFetch: Function,
  handleLoadMore: Function
}

interface ResponseData<T> {
  count: number
  rows: T[]
}

interface LoadingState {
  primaryLoading: boolean,
  deltaLoading: boolean
}

function useFetch<T>(options: FetchParams = {
  requestURL: '',
  queryParams: {},
  fetchDependence: [],
  deltaUpd: false,
}, initPaginationState: PaginationState = {
    on: false,
    current: 1,
    pageSize: 10,
    total: 0
}): ReturnObj<T> {

  const [data, setData] = React.useState<T[]>([])
  const [loading, setLoading] = React.useState<LoadingState>({
    primaryLoading: true,
    deltaLoading: false
  })
  const [pagination, setPagination] = React.useState<PaginationState>(initPaginationState)
  const [count, setCount] = React.useState(0)
  const [loadCnt, setLoadCnt] = React.useState(0)

  const setLoadingToFalse = () => {
    setLoading({
      primaryLoading: false,
      deltaLoading: false
    })
  }

  const location = useLocation()
  const history = useHistory()

  const fetchData = (params?: LooseObj) => {
    let requestParams: LooseObj = {
      ...options.queryParams, ...params,
    }

    if(options.deltaUpd) {
      requestParams = {
        ...requestParams,
        page: loadCnt + 1,
        pageSize: options.loadStep || 10
      }
      setLoadCnt(loadCnt + 1)
    }

    if(pagination.on) {
      requestParams = {
        ...requestParams,
        page: pagination.current,
        pageSize: pagination.pageSize
      }
    }

    axios
      .get<ResponseData<T>&T>(options.requestURL, { params: requestParams })
      .then(({ data: res }) => {
        if(!!res && res.count > 0) {
          if(!!requestParams.pageSize && res.count > requestParams.pageSize) {
            const totalPage = Math.ceil(res.count / requestParams.pageSize)
            if(totalPage < requestParams.page) return fetchData({ page: totalPage })
            if(!options.deltaUpd)
              setPagination({
                on: true,
                total: res.count,
                current: requestParams.page,
                pageSize: requestParams.pageSize
              })
          }
          if(options.deltaUpd) {
            setData([...data, ...res.rows])
          } else {
            setData(res.rows)
          }
          setCount(res.count)
        }
        if(!res.count && res.count !== 0) {
          setData([res])
        }
        setLoadingToFalse()
      })
      .catch(err => {
        !!options.bus && options.bus.emit('unknownError')
        setLoadingToFalse()
      })
  }

  const fetchWithLoading = (params?: LooseObj) => {
    setLoading({
      ...loading,
      primaryLoading: true
    })
    fetchData(params)
  }

  React.useEffect(() => {
    if(!options.fetchDependence || options.fetchDependence?.length === 0) {
      fetchWithLoading()
    }
  }, [])

  React.useEffect(() => {
    if(!!options.fetchDependence && options.fetchDependence?.length > 0) {
      const params = decodeQuery(location.search)
      fetchWithLoading(params)
    }
  }, options.fetchDependence)

  const handlePageChange = React.useCallback((page: number) => {
    const search = location.search.includes('page=') ?
      location.search.replace(/(page=)(\d+)/, `$1${page}`) :
      `?page=${page}`
    const nextURL = location.pathname + search
    history.push(nextURL)
  }, [options.queryParams, location.pathname])

  const onFetch = React.useCallback((params: LooseObj) => {
    setLoading({
      ...loading,
      primaryLoading: true
    })
    fetchData(params)
  }, [options.queryParams])

  const handleLoadMore = (params: LooseObj) => {
    if(!options.loadStep) return false
    if(loadCnt * options.loadStep >= count) return false
    setLoading({
      ...loading,
      deltaLoading: true
    })
    fetchData({
      ...params,
      page: loadCnt + 1,
      pageSize: options.loadStep
    })
    setLoadCnt(loadCnt + 1)
    return true
  }

  return {
    data,
    pagination: {
      ...pagination,
      onChange: handlePageChange
    },
    count,
    loading,
    onFetch,
    handleLoadMore
  }
}

export default useFetch