import { combineReducers } from 'redux'

import user from './user/reducer'
import tag from './tag/reducers'

export default combineReducers({
  user,
  tag
})