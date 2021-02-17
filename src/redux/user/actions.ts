import * as Types from '../types'

import axios from '@/utils/axios'

const userLoginAction = (params: any): Types.SFAPayload<Types.USER_LOGIN, any> => ({
  type: Types.USER_LOGIN,
  payload: params
})

const userLogoutAction = (): Types.SFA<Types.USER_LOGOUT> => ({
  type: Types.USER_LOGOUT
})

export const userLogin = (params: any, bus: any): Types.CustomDispatch => {
  return (dispatch) => 
    axios.post('/account/login', params).then(res => {
      dispatch(userLoginAction(res.data))
      bus.emit('loginSuccess')
      return res.data
    })
    .catch(err => {
      bus.emit('loginFailed')
      return err
    })
}

export const userRegister = (params: any, bus: any): Types.CustomDispatch => {
  return (dispatch) => {
    axios.post('/account/register', params).then(res => {
      bus.emit('registerSuccess')
      return res.data
    })
    .catch(err => {
      bus.emit('registerFailed')
      return err
    })
  }
}

export const userLogout = (bus: any): Types.CustomDispatch => {
  return (dispatch) => {
    bus.emit('logoutSuccess')
    dispatch(userLogoutAction())
  }
}