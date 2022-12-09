import { getAllUsersSuccess, getAllUsersFailure } from './actions'
import { GET_ALL_USERS } from './constant'
import { getAllUsers } from './services'
import { call, put, takeEvery } from 'redux-saga/effects'

function* getAllUsersSaga() {
  try {
    const res = yield call(getAllUsers)
    yield put(getAllUsersSuccess(res))
  } catch (error) {
    yield put(getAllUsersFailure(error))
  }
}

function* membersSaga() {
  yield takeEvery(GET_ALL_USERS, getAllUsersSaga)
}

export default membersSaga
