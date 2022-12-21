import daysOffSaga from '@app/redux/daysOff/saga'
import groupsSaga from '@app/redux/groups/saga'
import loginSaga from '@app/redux/login/saga'
import membersSaga from '@app/redux/members/saga'
import requestsSaga from '@app/redux/requests/saga'
import slackSaga from '@app/redux/slack/saga'
import notificationsSaga from './notifications/saga'
import sheetSaga from './sheet/saga'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    loginSaga(),
    membersSaga(),
    groupsSaga(),
    requestsSaga(),
    daysOffSaga(),
    slackSaga(),
    notificationsSaga(),
    sheetSaga(),
  ])
}
