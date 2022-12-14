import {
  getAllUsersSuccess,
  getAllUsersFailure,
  getUserByIdSuccess,
  getUserByIdFailure,
  createUserSuccess,
  createUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  getMeSuccess,
  getMeFailure,
  updateUserSuccess,
  updateUserFailure,
} from './actions'
import { GET_ALL_USERS, GET_USER_BY_ID, CREATE_USER, DELETE_USER, GET_ME, UPDATE_USER } from './constant'
import { getAllUsers, getUserById, createUser, deleteUser, getMe, updateUser } from './services'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

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
    yield put(getUserByIdSuccess(res.data))
  } catch (error) {
    yield put(getUserByIdFailure(error))
  }
}
function* createUserSaga(action) {
  try {
    const res = yield call(createUser, action.payload)
    yield put(createUserSuccess(res))
  } catch (error) {
    yield put(createUserFailure(error))
  }
}
function* deleteUserSaga(action) {
  try {
    const res = yield call(deleteUser, action.payload)
    yield put(deleteUserSuccess(res))
  } catch (error) {
    yield put(deleteUserFailure(error))
  }
}

function* getMeSaga() {
  try {
    const res = yield call(getMe)
    yield put(getMeSuccess(res.data))
  } catch (error) {
    yield put(getMeFailure(error))
  }
}

function* updateUserSaga(action) {
  try {
    const res = yield call(updateUser, action.payload)
    yield put(updateUserSuccess(res))
  } catch (error) {
    yield put(updateUserFailure(error))
  }
}

function* membersSaga() {
  yield takeEvery(GET_ALL_USERS, getAllUsersSaga)
  yield takeEvery(GET_USER_BY_ID, getUserByIdSaga)
  yield takeLatest(CREATE_USER, createUserSaga)
  yield takeEvery(DELETE_USER, deleteUserSaga)
  yield takeEvery(GET_ME, getMeSaga)
  yield takeLatest(UPDATE_USER, updateUserSaga)
}

export default membersSaga
