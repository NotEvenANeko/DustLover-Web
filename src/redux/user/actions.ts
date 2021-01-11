import * as Types from '../types'
import { Dispatch } from 'redux'

import axios from '@/utils/axios'
import useBus from '@/hooks/useBus'

const userLoginAction = (params: any): Types.SFAPayload<Types.USER_LOGIN, any> => ({
  type: Types.USER_LOGIN,
  payload: params
})

const userRegisterAction = (params: any): Types.SFA<Types.USER_REGISTER> => ({
  type: Types.USER_REGISTER
})

const userLogoutAction = (): Types.SFA<Types.USER_LOGOUT> => ({
  type: Types.USER_LOGOUT
})

export const userLogin = (params: any, bus: any): Types.CustomDispatch => {
  return (dispatch) => 
    axios.post('/account/login', params).then(res => {
      dispatch(userLoginAction(res))
      bus.emit('loginSuccess')
      return res
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
      return res
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