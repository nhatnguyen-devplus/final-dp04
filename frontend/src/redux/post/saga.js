import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { getPostData, postPostData } from './services'
import { getListPostSuccess, getListPostFailure, postListPostSuccess, postListPostFailure } from './actions'

function* getListPostSaga(action) {
  try {
    const data = yield call(getPostData)
    yield put(getListPostSuccess(data))
  } catch (error) {
    yield put(getListPostFailure(error))
  }
}

function* postListPostSaga(action) {
  try {
    const data = yield call(postPostData, action.payload.id)
    yield put(postListPostSuccess(data))
  } catch (error) {
    yield put(postListPostFailure(error))
  }
}

function* postsSaga() {
  yield takeLatest('GET_LIST_POST', getListPostSaga)
  yield takeEvery('POST_LIST_POST', postListPostSaga)
}

export default postsSaga
