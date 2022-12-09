import loginSaga from '@app/redux/login/saga'
import membersSaga from '@app/redux/members/saga'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([loginSaga(), membersSaga()])
}
