import axios from 'axios'

import config from '@/config'

import { getSessionStorage, saveSessionStorage, removeSessionStorage } from '../storage'
import { getRefreshToken } from '../index'

export const refreshToken = (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const refreshToken = getRefreshToken()
    if(refreshToken) {
      axios.get(config.AXIOS_OPTIONS.baseURL + 'token/refresh', {
        headers: {'Authorization': refreshToken}
      })
      .then(res => {
        if(res.data.accessToken) {
          const userInfo = getSessionStorage('userInfo')
          const newInfo = { ...userInfo, ...res.data }
          removeSessionStorage('userInfo')
          saveSessionStorage('userInfo', newInfo)
          resolve('OK')
        } else {
          reject('Error')
        }
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })
    } else {
      reject('No Token')
    }
  })
}