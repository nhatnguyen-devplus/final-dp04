import { getHistoriesSuccess, getHistoriesFailure } from './action'
import { GET_HISTORIES } from './constant'
import { getHistories } from './services'
import { call, put, takeEvery } from 'redux-saga/effects'

function* getHistoriesSaga(action) {
  try {
    const res = yield call(getHistories, action.payload)
    yield put(getHistoriesSuccess(res.data))
  } catch (error) {
    yield put(getHistoriesFailure(error))
  }
}

function* historiesSaga() {
  yield takeEvery(GET_HISTORIES, getHistoriesSaga)
}

export default historiesSaga
