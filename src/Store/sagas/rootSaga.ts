import { fork } from 'redux-saga/effects'
import userInfoSaga from './userInfoSaga'

export default function* rootSaga() {
  yield fork(userInfoSaga)
}
