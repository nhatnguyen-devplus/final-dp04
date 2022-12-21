import { getDataSheetSuccess, getDataSheetFailure } from './actions'
import { GET_DATA_SHEET } from './constant'
import { getDataSheet } from './services'
import { call, put, takeEvery } from 'redux-saga/effects'

function* getDataSheetSaga(action) {
  try {
    const res = yield call(getDataSheet, action.payload)
    yield put(getDataSheetSuccess(res))
  } catch (error) {
    yield put(getDataSheetFailure(error))
  }
}

function* sheetSaga() {
  yield takeEvery(GET_DATA_SHEET, getDataSheetSaga)
}

export default sheetSaga
