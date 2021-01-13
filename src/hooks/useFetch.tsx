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
  requestURL: string,
  queryParams?: LooseObj,
  fetchDependence?: any[],
  bus?: any,
  initPaginationState?: PaginationState,
  deltaUpd?: boolean,
  loadStep?: number
}

interface ListData {
  count: number,
  rows: LooseObj[]
}

interface ReturnPagination extends PaginationState {
  onChange: Function
}

type Data = ListData | LooseObj
type ReturnData = LooseObj | LooseObj[]

interface ReturnObj {
  data: ReturnData,
  loading: LoadingState,
  count: number,
  pagination?: ReturnPagination,
  onFetch: Function,
  handleLoadMore: Function
}

interface LoadingState {
  primaryLoading: boolean,
  deltaLoading: boolean
}

const useFetch: (args: FetchParams) => ReturnObj = ({
  requestURL = '',
  initPaginationState = {
    on: false,
    current: 1,
    pageSize: 10,
    total: 0
  },
  queryParams,
  fetchDependence = [],
  bus,
  deltaUpd = false,
  loadStep
}) => {

  const [data, setData] = React.useState<ReturnData>([])
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
      ...queryParams, ...params,
    }

    if(deltaUpd) {
      requestParams = {
        ...requestParams,
        page: loadCnt + 1,
        pageSize: loadStep || 10
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
      .get(requestURL, { params: requestParams })
      .then((res: Data) => {
        if(!!res.count && res.count > 0) {
          if(!!requestParams.pageSize && res.count > requestParams.pageSize) {
            const totalPage = Math.ceil(res.count / requestParams.pageSize)
            if(totalPage < requestParams.page) return fetchData({ page: totalPage })
            if(!deltaUpd)
              setPagination({
                on: true,
                total: res.count,
                current: requestParams.page,
                pageSize: requestParams.pageSize
              })
          }
          if(deltaUpd) {
            setData([...(data as LooseObj[]), ...res.rows])
          } else {
            setData(res.rows)
          }
          setCount(res.count)
        }
        if(!res.count) {
          setData(res)
        }
        setLoadingToFalse()
      })
      .catch(err => {
        !!bus && bus.emit('unknownError')
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
    if(!fetchDependence || fetchDependence?.length === 0) {
      fetchWithLoading()
    }
  }, [])

  React.useEffect(() => {
    if(!!fetchDependence && fetchDependence?.length > 0) {
      const params = decodeQuery(location.search)
      fetchWithLoading(params)
    }
  }, fetchDependence)

  const handlePageChange = React.useCallback((page: number) => {
    const search = location.search.includes('page=') ?
      location.search.replace(/(page=)(\d+)/, `$1${page}`) :
      `?page=${page}`
    const nextURL = location.pathname + search
    history.push(nextURL)
  }, [queryParams, location.pathname])

  const onFetch = React.useCallback((params: LooseObj) => {
    setLoading({
      ...loading,
      primaryLoading: true
    })
    fetchData(params)
  }, [queryParams])

  const handleLoadMore = (params: LooseObj) => {
    if(!loadStep) return false
    if(loadCnt * loadStep > count) return false
    setLoading({
      ...loading,
      deltaLoading: true
    })
    fetchData({
      ...params,
      page: loadCnt + 1,
      pageSize: loadStep
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