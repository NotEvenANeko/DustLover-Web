import thunk from 'redux-thunk'
import { compose, createStore, applyMiddleware } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducers from './rootReducers'

const dev = process.env.NODE_ENV === 'development'

let storeEnhancers: any
if(!dev) {
  storeEnhancers = compose(applyMiddleware(thunk))
} else {
  storeEnhancers = compose(composeWithDevTools(applyMiddleware(thunk)))
}

const configureStore = (initialState: any = {
  user: {},
  tag: {}
}) => {
  const store = createStore(rootReducers, initialState, storeEnhancers)
  return store
}

export default configureStore()