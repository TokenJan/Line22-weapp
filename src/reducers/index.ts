import { combineReducers } from 'redux'
import timetableReducer from './timetableReducer'
import modalReducer from './modalReducer'

export default combineReducers({
  timetable: timetableReducer,
  modal: modalReducer
})