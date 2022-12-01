import { all } from 'redux-saga/effects'
import postsSaga from '@app/redux/post/saga'

export default function* rootSaga(getState) {
  yield all([postsSaga()])
}
