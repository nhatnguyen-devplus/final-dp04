import { combineReducers } from 'redux'
import daysOffReducer from './daysOff/reducer'
import groupsReducer from './groups/reducer'
import loginReducer from './login/reducer'
import membersReducer from './members/reducer'
import requestsReducer from './requests/reducer'
import slackReducer from './slack/reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  members: membersReducer,
  groups: groupsReducer,
  requests: requestsReducer,
  daysOff: daysOffReducer,
  slack: slackReducer,
})
export default rootReducer
