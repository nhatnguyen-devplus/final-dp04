import { combineReducers } from 'redux'
import daysOffReducer from './daysOff/reducer'
import groupsReducer from './groups/reducer'
import historiesReducer from './histories/reducer'
import loginReducer from './login/reducer'
import membersReducer from './members/reducer'
import newPasswordReducer from './newPassword/reducer'
import notificationsReducer from './notifications/reducer'
import requestsReducer from './requests/reducer'
import sheetReducer from './sheet/reducer'
import slackReducer from './slack/reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  members: membersReducer,
  groups: groupsReducer,
  requests: requestsReducer,
  daysOff: daysOffReducer,
  slack: slackReducer,
  notifications: notificationsReducer,
  sheet: sheetReducer,
  histories: historiesReducer,
  newPassword: newPasswordReducer,
})
export default rootReducer
