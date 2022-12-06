import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { getAllUsers } from './services'
import { GET_ALL_USERS } from './constant'
import { getAllUsersSuccess, getAllUsersFailure } from './actions'

function* getAllUsersSaga(action) {
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
