import {
  getAllSlackChannelsSuccess,
  getAllSlackChannelsFailure,
  getSlackChannelsDBSuccess,
  getSlackChannelsDBFailure,
  updateSlackChannelsSuccess,
  updateSlackChannelsFailure,
} from './actions'

import { GET_ALL_SLACK_CHANNELS, GET_SLACK_CHANNELS_DB, UPDATE_SLACK_CHANNELS } from './constant'
import { getAllSlackChannels, getSlackChannelsDB, updateSlackChannels } from './services'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* getAllSlackChannelsSaga() {
  try {
    const res = yield call(getAllSlackChannels)
    yield put(getAllSlackChannelsSuccess(res.data))
  } catch (error) {
    yield put(getAllSlackChannelsFailure(error))
  }
}

function* getSlackChannelsDBSaga() {
  try {
    const res = yield call(getSlackChannelsDB)
    yield put(getSlackChannelsDBSuccess(res.data[0]))
  } catch (error) {
    yield put(getSlackChannelsDBFailure(error))
  }
}

function* updateSlackChannelsSaga(action) {
  try {
    const res = yield call(updateSlackChannels, action.payload)
    yield put(updateSlackChannelsSuccess(res))
  } catch (error) {
    yield put(updateSlackChannelsFailure(error))
  }
}

function* slackSaga() {
  yield takeEvery(GET_ALL_SLACK_CHANNELS, getAllSlackChannelsSaga)
  yield takeEvery(GET_SLACK_CHANNELS_DB, getSlackChannelsDBSaga)
  yield takeLatest(UPDATE_SLACK_CHANNELS, updateSlackChannelsSaga)
}

export default slackSaga
