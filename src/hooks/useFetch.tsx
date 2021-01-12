import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import axios from '@/utils/axios'
import { decodeQuery } from '@/utils'

interface FetchParams {
  requestURL: string,
  queryParams?: LooseObj,
  withLoading: boolean,
  fetchDependence?: any[],
  withPagination: boolean,
  bus?: any
}

interface ListData {
  count: number,
  rows: LooseObj[]
}

interface PaginationState {
  on: boolean,
  current: number,
  pageSize: number,
  total: number
}

interface ReturnPagination extends PaginationState {
  onChange: Function
}

type Data = ListData | LooseObj
type ReturnData = LooseObj | LooseObj[]

interface ReturnObj {
  data: ReturnData,
  loading: boolean,
  count: number,
  pagination: ReturnPagination,
  onFetch: Function
}

/**
 * 
 * @param args 
 */
const useFetch: (args: FetchParams) => ReturnObj = ({
  requestURL = '',
  withLoading = true,
  withPagination = false,
  queryParams,
  fetchDependence,
  bus
}) => {

  const [data, setData] = React.useState<ReturnData>([])
  const [loading, setLoading] = React.useState(true)
  const [pagination, setPagination] = React.useState<PaginationState>({
    on: false,
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [count, setCount] = React.useState(0)

  const location = useLocation()
  const history = useHistory()

  const fetchData = (params?: LooseObj) => {
    let requestParams: LooseObj = {
      ...queryParams, ...params,
    }

    if(withPagination) {
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
          if(res.count > requestParams.pageSize) {
            const totalPage = Math.ceil(res.count / requestParams.pageSize)
            if(totalPage < requestParams.page) return fetchData({ page: totalPage })
            setPagination({
              on: true,
              total: res.count,
              current: requestParams.page,
              pageSize: requestParams.pageSize
            })
          }
          setData(res.rows)
          setCount(count)
        }
        if(!res.count) {
          setData(res)
        }
        withLoading && setLoading(false)
      })
      .catch(err => {
        !!bus && bus.emit('unknownError')
        withLoading && setLoading(false)
      })
  }

  const fetchWithLoading = (params?: LooseObj) => {
    withLoading && setLoading(true)
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
  }, fetchDependence || [])

  const handlePageChange = React.useCallback((page: number) => {
    const search = location.search.includes('page=') ?
      location.search.replace(/(page=)(\d+)/, `$1${page}`) :
      `?page=${page}`
    const nextURL = location.pathname + search
    history.push(nextURL)
  }, [queryParams, location.pathname])

  const onFetch = React.useCallback((params: LooseObj) => {
    withLoading && setLoading(true)
    fetchData(params)
  }, [queryParams])

  return {
    data,
    pagination: {
      ...pagination,
      onChange: handlePageChange
    },
    count,
    loading,
    onFetch
  }
}

export default useFetch