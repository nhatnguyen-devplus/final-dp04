import { getAllUsersSuccess, getAllUsersFailure, getUserByIdSuccess, getUserByIdFailure } from './actions'
import { GET_ALL_USERS, GET_USER_BY_ID } from './constant'
import { getAllUsers, getUserById } from './services'
import { call, put, takeEvery } from 'redux-saga/effects'

function* getAllUsersSaga() {
  try {
    const res = yield call(getAllUsers)
    yield put(getAllUsersSuccess(res))
  } catch (error) {
    yield put(getAllUsersFailure(error))
  }
}

function* getUserByIdSaga(action) {
  try {
    const res = yield call(getUserById, action.payload)
    yield put(getUserByIdSuccess(res))
  } catch (error) {
    yield put(getUserByIdFailure(error))
  }
}
function* membersSaga() {
  yield takeEvery(GET_ALL_USERS, getAllUsersSaga)
  yield takeEvery(GET_USER_BY_ID, getUserByIdSaga)
}

export default membersSaga
