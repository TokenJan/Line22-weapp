import { OPENMODAL, CLOSEMODAL } from '../constants/scheduler'

const INITIAL_STATE = {
    isOpened: false
}

export default function modalReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPENMODAL:
        return {
          ...state,
          isOpened: true
        }
     case CLOSEMODAL:
       return {
         ...state,
         isOpened: false
       }
     default:
       return state
  }
}