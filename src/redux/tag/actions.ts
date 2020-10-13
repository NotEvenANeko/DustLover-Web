import * as Types from '../types'
import { Dispatch } from 'redux'

import axios from '@/utils/axios'

const getTagListAction = (params: any): Types.SFAPayload<Types.GET_TAG_LIST, any> => {
  return {
    type: Types.GET_TAG_LIST,
    payload: params
  }
}

const getCategoryListAction = (params: any): Types.SFAPayload<Types.GET_CATEGORY_LIST, any> => {
  return {
    type: Types.GET_CATEGORY_LIST,
    payload: params
  }
}

export const getTagList = (params: any): Types.CustomDispatch => {
  return (dispatch: Dispatch) => {
    axios.get('/tag')
         .then(res => {
            dispatch(getTagListAction(res))
         })
  }
}

export const getCategoryList = (params: any): Types.CustomDispatch => {
  return (dispatch: Dispatch) => {
    axios.get('/category')
         .then(res => {
            dispatch(getCategoryListAction(res))
         })
  }
}