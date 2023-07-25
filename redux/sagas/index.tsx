import { all, put, takeEvery } from 'redux-saga/effects'
import appsetting from "./appsetting"
import chat from "./chat"
function* increment() {
  // 相当于：dispatch({ type: 'increment' })
  yield put({ type: 'increment' })
}

function* watchIncrement() {
  // 监听类型为increment_saga的action，监听到启动increment
  yield takeEvery('increment_saga', increment)
}

function* rootSaga() {
  // 启动watchIncrement
  yield all([appsetting(), chat()])
}

export default rootSaga
