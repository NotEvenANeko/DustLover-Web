import { Action, Dispatch } from 'redux'

export interface SFA<ActionType> extends Action<ActionType> {}
export interface SFAPayload<ActionType, Payload> extends SFA<ActionType> {
  payload: Payload
}

export interface CustomDispatch {
  (dispatch: Dispatch): any
}

export interface UserInfo {
  username: string,
  userRole: number,
  userId: number
}

export interface LoginPayload {
  username: string,
  userRole: number,
  userId: number,
  accessToken: string,
  refreshToken: string
}

export const USER_LOGIN = 'USER_LOGIN'
export type USER_LOGIN = typeof USER_LOGIN

export const USER_REGISTER = 'USER_REGISTER'
export type USER_REGISTER = typeof USER_REGISTER

export const USER_LOGOUT = 'USER_LOGOUT'
export type USER_LOGOUT = typeof USER_LOGOUT

export const GET_TAG_LIST = 'GET_TAG_LIST'
export type GET_TAG_LIST = typeof GET_TAG_LIST

export const GET_CATEGORY_LIST = 'GET_CATEGORYLIST'
export type GET_CATEGORY_LIST = typeof GET_CATEGORY_LIST

export type EmptyAction = string