import {
  getAllRequestsSuccess,
  getAllRequestsFailure,
  createRequestSuccess,
  createRequestFailure,
  getRequestByIdSuccess,
  getRequestByIdFailure,
  updateRequestSuccess,
  updateRequestFailure,
} from './actions'
import { GET_ALL_REQUESTS, GET_REQUEST_BY_ID, CREATE_REQUEST, UPDATE_REQUEST } from './constant'
import { getAllRequests, getRequestById, createRequest, updateRequest } from './services'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* getAllRequestsSaga() {
  try {
    const res = yield call(getAllRequests)
    yield put(getAllRequestsSuccess(res.data))
  } catch (error) {
    yield put(getAllRequestsFailure(error))
  }
}

function* getRequestByIdSaga(action) {
  try {
    const res = yield call(getRequestById, action.payload)
    yield put(getRequestByIdSuccess(res))
  } catch (error) {
    yield put(getRequestByIdFailure(error))
  }
}

function* createRequestSaga(action) {
  try {
    const res = yield call(createRequest, action.payload)
    yield put(createRequestSuccess(res))
  } catch (error) {
    yield put(createRequestFailure(error))
  }
}

function* updateRequestSaga(action) {
  try {
    const res = yield call(updateRequest, action.payload)
    yield put(updateRequestSuccess(res))
  } catch (error) {
    yield put(updateRequestFailure(error))
  }
}

function* membersSaga() {
  yield takeEvery(GET_ALL_REQUESTS, getAllRequestsSaga)
  yield takeEvery(GET_REQUEST_BY_ID, getRequestByIdSaga)
  yield takeLatest(CREATE_REQUEST, createRequestSaga)
  yield takeLatest(UPDATE_REQUEST, updateRequestSaga)
}

export default membersSaga
