import { getUserLoginSuccess, getUserLoginFailure, getUserByTokenSuccess, getUserByTokenFailure } from './actions'
import { GET_USER_LOGIN, GET_USER_LOGIN_GOOGLE, GET_USER_BY_TOKEN } from './constant'
import { postLogin, postLoginGoogle, checkToken } from './services'
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'

function* getUserLoginSaga(action) {
  try {
    const res = yield call(postLogin, action.payload.data)
    if (res && 200 === res.status) {
      localStorage.setItem('token', res.data.token)
    }
    yield put(getUserLoginSuccess(res))
  } catch (error) {
    yield put(getUserLoginFailure(error))
  }
}

function* getUserLoginGoogleSaga(action) {
  try {
    localStorage.setItem('token', action.payload.isTokenGG)
    const res = yield call(postLoginGoogle)
    if (res && 200 === res.status) {
      localStorage.setItem('token', res.data.token)
    }
    yield put(getUserLoginSuccess(res))
  } catch (error) {
    yield put(getUserLoginFailure(error))
  }
}

function* getUserByTokenSaga() {
  try {
    if (localStorage.getItem('token')) {
      const res = yield call(checkToken)
      if (res && 200 === res.status) {
        yield put(getUserByTokenSuccess(res))
      } else {
        yield put(getUserByTokenFailure(res))
      }
    } else {
      yield put(getUserByTokenFailure(''))
    }
  } catch (error) {
    yield put(getUserByTokenFailure(error))
  }
}

function* loginSaga() {
  yield takeEvery(GET_USER_LOGIN, getUserLoginSaga)
  yield takeEvery(GET_USER_LOGIN_GOOGLE, getUserLoginGoogleSaga)
  yield takeLatest(GET_USER_BY_TOKEN, getUserByTokenSaga)
}

export default loginSaga
