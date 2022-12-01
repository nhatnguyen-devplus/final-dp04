import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { postLogin, checkToken } from './services'
import { GET_USER_LOGIN, GET_USER_BY_TOKEN } from './constant'
import { getUserLoginSuccess, getUserLoginFailure, getUserByTokenSuccess, getUserByTokenFailure } from './actions'

function* getUserLoginSaga(action) {
  try {
    const res = yield call(postLogin, action.payload.data)
    if (res && res.status === 200) {
      localStorage.setItem('token', res.data.token)
    }
    yield put(getUserLoginSuccess(res))
  } catch (error) {
    yield put(getUserLoginFailure(error))
  }
}

function* getUserByTokenSaga(action) {
  try {
    const res = yield call(checkToken)
    yield put(getUserByTokenSuccess(res))
  } catch (error) {
    yield put(getUserByTokenFailure(error))
  }
}

function* loginSaga() {
  yield takeEvery(GET_USER_LOGIN, getUserLoginSaga)
  yield takeLatest(GET_USER_BY_TOKEN, getUserByTokenSaga)
}

export default loginSaga
