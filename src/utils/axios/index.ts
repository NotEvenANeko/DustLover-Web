import axios, {AxiosResponse} from 'axios'

import config from '@/config.ts'
import { getAccessToken } from '..'
import { refreshToken } from '../refreshToken'

const service = axios.create({
  baseURL: config.AXIOS_OPTIONS.baseURL,
  timeout: config.AXIOS_OPTIONS.timeout
})

service.interceptors.request.use(req => {

  let accessToken = getAccessToken()
  if(accessToken) req.headers.common['Authorization'] = accessToken
  return req

}, err => {

  Promise.reject('Error')

})

service.interceptors.response.use(async (res: AxiosResponse<ReturnRawData>) => {
  return res
}, async err => {
  if(err.response) {
    const { data, status } = err.response
    if(status !== 401) return Promise.reject('Error')
    if(data.message !== 'Token Error' && data.message !== 'Login Failed' && data.message !== 'No Token') {


    } else if(data.message === 'Token Error' || data.message === 'No Token') {
      return await refreshToken()
        .then(async (res) => {
          const accessToken = getAccessToken()
          err.config.headers.Authorization = accessToken
          try {
            //console.log(111)
            const res = await service(err.config)
            //console.log(res)
            return Promise.resolve(res.data || res || 'OK')
          }
          catch (err) {
            return Promise.reject(err)
          }
        })
        .catch(err => {
          return Promise.reject('Error')
        })
    }
    //console.log(3)
  }

  return Promise.reject('Error')

})

export default service