import { getAllDaysOffSuccess, getAllDaysOffFailure } from './actions'
import { GET_ALL_DAYS_OFF } from './constant'
import { getAllDaysOff } from './services'
import { call, put, takeEvery } from 'redux-saga/effects'

function* getAllDaysOffSaga(action) {
  try {
    const res = yield call(getAllDaysOff, action.payload)
    yield put(getAllDaysOffSuccess(res))
  } catch (error) {
    yield put(getAllDaysOffFailure(error))
  }
}

function* daysOffSaga() {
  yield takeEvery(GET_ALL_DAYS_OFF, getAllDaysOffSaga)
}

export default daysOffSaga
