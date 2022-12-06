import { all } from 'redux-saga/effects'
import loginSaga from '@app/redux/login/saga'

export default function* rootSaga(getState) {
  yield all([loginSaga()])
}
