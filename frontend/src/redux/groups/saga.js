import {
  getAllGroupsSuccess,
  getAllGroupsFailure,
  getGroupByIdSuccess,
  getGroupByIdFailure,
  postCreateGroupSuccess,
  postCreateGroupFailure,
  updateGroupSuccess,
  updateGroupFailure,
  deleteGroupSuccess,
  deleteGroupFailure,
} from './actions'
import { GET_ALL_GROUPS, GET_GROUP_BY_ID, POST_CREATE_GROUP, UPDATE_GROUP, DELETE_GROUP } from './constant'
import { getAllGroups, getGroupById, postCreateGroup, updateGroup, deleteGroup } from './services'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* getAllGroupsSaga() {
  try {
    const res = yield call(getAllGroups)
    yield put(getAllGroupsSuccess(res))
  } catch (error) {
    yield put(getAllGroupsFailure(error))
  }
}

function* getGroupByIdSaga(action) {
  try {
    const res = yield call(getGroupById, action.payload)
    yield put(getGroupByIdSuccess(res))
  } catch (error) {
    yield put(getGroupByIdFailure(error))
  }
}

function* postCreateGroupSaga(action) {
  try {
    const res = yield call(postCreateGroup, action.payload)
    yield put(postCreateGroupSuccess(res))
  } catch (error) {
    yield put(postCreateGroupFailure(error))
  }
}

function* updateGroupSaga(action) {
  try {
    const res = yield call(updateGroup, action.payload)
    yield put(updateGroupSuccess(res))
  } catch (error) {
    yield put(updateGroupFailure(error))
  }
}

function* deleteGroupSaga(action) {
  try {
    const res = yield call(deleteGroup, action.payload)
    yield put(deleteGroupSuccess(res))
  } catch (error) {
    yield put(deleteGroupFailure(error))
  }
}

function* groupsSaga() {
  yield takeEvery(GET_ALL_GROUPS, getAllGroupsSaga)
  yield takeLatest(GET_GROUP_BY_ID, getGroupByIdSaga)
  yield takeLatest(POST_CREATE_GROUP, postCreateGroupSaga)
  yield takeLatest(UPDATE_GROUP, updateGroupSaga)
  yield takeEvery(DELETE_GROUP, deleteGroupSaga)
}

export default groupsSaga
