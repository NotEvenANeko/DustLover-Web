import * as Types from '../types'
import { Dispatch } from 'redux'

import axios from '@/utils/axios'

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

export const userLogin = (params: any): Types.CustomDispatch => {
  return (dispatch) => 
    axios.post('/account/login', params).then(res => {
      dispatch(userLoginAction(res))
      return res
    })
    .catch(err => {
      return err
    })
}

export const userRegister = (params: any): Types.CustomDispatch => {
  return (dispatch) => {
    axios.post('/account/register', params).then(res => {
      return res
    })
    .catch(err => {
      return err
    })
  }
}

export const userLogout = (): Types.CustomDispatch => {
  return (dispatch) => {
    dispatch(userLogoutAction())
  }
}