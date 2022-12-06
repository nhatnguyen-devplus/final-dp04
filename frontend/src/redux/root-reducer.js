import { combineReducers } from 'redux'
import loginReducer from './login/reducer'
import membersReducer from './members/reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  members: membersReducer,
})
export default rootReducer
