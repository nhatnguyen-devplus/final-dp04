import {
  getNotificationsSuccsess,
  getNotificationsFailure,
  seenNotificationsSuccsess,
  seenNotificationsFailure,
} from './action'
import { GET_NOTIFICATIONS, SEEN_NOTIFICATIONS } from './constant'
import { getNotifications, seenNotifications } from './services'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* getNotificationsSaga() {
  try {
    const res = yield call(getNotifications)
    yield put(getNotificationsSuccsess(res.data))
  } catch (error) {
    yield put(getNotificationsFailure(error))
  }
}

function* seenNotificationsSaga(action) {
  try {
    const res = yield call(seenNotifications, action.payload)
    yield put(seenNotificationsSuccsess(res))
  } catch (error) {
    yield put(seenNotificationsFailure(error))
  }
}
function* notificationsSaga() {
  yield takeEvery(GET_NOTIFICATIONS, getNotificationsSaga)
  yield takeLatest(SEEN_NOTIFICATIONS, seenNotificationsSaga)
}

export default notificationsSaga
