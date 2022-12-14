import { combineReducers } from 'redux'
import groupsReducer from './groups/reducer'
import loginReducer from './login/reducer'
import membersReducer from './members/reducer'
import requestsReducer from './requests/reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  members: membersReducer,
  groups: groupsReducer,
  requests: requestsReducer,
})
export default rootReducer
