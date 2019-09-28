import {
  WEEKDAY,
  WEEKEND,
  UPDATETIMETABLE
} from '../constants/scheduler'
import {
  START,
  END,
  EXCHANGE
} from '../constants/station'

export const selectWeekDay = () => {
  return {
    type: WEEKDAY
  }
}
export const selectWeekEnd = () => {
  return {
    type: WEEKEND
  }
}
export const updateTimetable = () => {
  return {
    type: UPDATETIMETABLE
  }
}
export const selectStartStation = (index: number) => {
  return {
    type: START,
    index: index
  }
}
export const selectEndStation = (index: number) => {
  return {
    type: END,
    index: index
  }
}
export const exchangeStation = () => {
  return {
    type: EXCHANGE
  }
}