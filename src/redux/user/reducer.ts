import * as Types from '../types'
import {  getLocalStorage,
          getSessionStorage,
          saveLocalStorage,
          saveSessionStorage,
          removeLocalStorage,
          removeSessionStorage
          } from '@/utils/storage'

let defaultState: Types.UserInfo = {
  username: '',
  userRole: 3,
  userId: 0
}

const userInfo1 = getSessionStorage('userInfo')
const userInfo2 = getLocalStorage('userInfo')

if(userInfo1) defaultState = { ...defaultState, ...userInfo1 }
if(userInfo2) defaultState = { ...defaultState, ...userInfo2 }

const UserReducer = (state: Types.UserInfo = defaultState, action: Types.SFAPayload<Types.EmptyAction, Types.LoginPayload>) => {
  const { type, payload } = action
  switch(type) {
    case Types.USER_LOGIN:
      const { username, userId, userRole, accessToken, refreshToken } = payload
      saveSessionStorage('userInfo', { username, userId, userRole, accessToken })
      saveLocalStorage('userInfo', { username, userRole, userId, refreshToken })
      return { ...state, username, userId, userRole }

    case Types.USER_LOGOUT:
      removeSessionStorage('userInfo')
      removeLocalStorage('userInfo')
      return { ...state, username: '', userRole: 3, userId: 0 }

    default: return state
  }
}

export default UserReducer