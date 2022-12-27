import { postNewPasswordSuccess, postNewPasswordFailure } from './actions'
import { POST_NEW_PASSWORD } from './constant'
import { postNewPassword } from './services'
import { call, put, takeLatest } from 'redux-saga/effects'

function* postNewPasswordSaga(action) {
  try {
    const res = yield call(postNewPassword, action.payload.data)
    yield put(postNewPasswordSuccess(res))
  } catch (error) {
    yield put(postNewPasswordFailure(error))
  }
}

function* newPasswordSaga() {
  yield takeLatest(POST_NEW_PASSWORD, postNewPasswordSaga)
}

export default newPasswordSaga
