import { all } from 'redux-saga/effects'
import loginSaga from '@app/redux/login/saga'
import membersSaga from '@app/redux/members/saga'

export default function* rootSaga(getState) {
  yield all([loginSaga(), membersSaga()])
}
