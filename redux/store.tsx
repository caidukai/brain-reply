import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from './reducer'
import rootSaga from './sagas'

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}
const handleChange = (i: any) => {

}
export const makeStore = (context: any) => {
  const sagaMiddleware = createSagaMiddleware()
  const store: any = createStore(rootReducer, bindMiddleware([sagaMiddleware,]))

  store.sagaTask = sagaMiddleware.run(rootSaga)
  store.subscribe(handleChange)
  return store
}

export const wrapper = createWrapper(makeStore, { debug: true })