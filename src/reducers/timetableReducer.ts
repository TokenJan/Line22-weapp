import { WEEKDAY, WEEKEND, UPDATETIMETABLE } from '../constants/scheduler'
import { START, END, EXCHANGE } from '../constants/station'
import { ALL_TRAINLINES, WEEKDAY_JS_TO_SH, WEEKEND_JS_TO_SH, WEEKDAY_SH_TO_JS, WEEKEND_SH_TO_JS } from '../constants/station'

interface Station {
  id: string,
  type: string,
  startTime: string,
  endTime: string
}

const INITIAL_STATE = {
  isWeekend: false,
  isReversed: false,
  start: 0,
  end: 7,
  timetable: [],
  trainType: 3,
}

export default function timetableReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case WEEKDAY:
      return {
        ...state,
        isWeekend: false
      }
     case WEEKEND:
       return {
         ...state,
         isWeekend: true
       }
     case START:
       return {
         ...state,
         start: action.index,
         trainType: calculateTrainType(action.index, state.end)
       }
     case END:
       return {
         ...state,
         end: action.index,
         trainType: calculateTrainType(state.start, action.index)
       }
     case EXCHANGE:
        return {
          ...state,
          start: state.end,
          end: state.start,
          isReversed: !state.isReversed
        }
     case UPDATETIMETABLE:
       return {
         ...state,
         timetable: calculateTimetable(state)
       }
     default:
       return state
  }
}

function calculateTrainType(start: number, end: number) : number {
  const bigStops = [0, 7]
  const mediumStops = [0, 2, 5, 7]
  return (bigStops.includes(start) && bigStops.includes(end)) ? 3 : (mediumStops.includes(start) && mediumStops.includes(end)) ? 2 : 1
}

function calculateTimetable(state) : Station[] {
  const timetable : Station[] = []
  const trainlines : string[] = state.isWeekend ? ( state.isReversed ? WEEKEND_SH_TO_JS : WEEKEND_JS_TO_SH) : (state.isReversed ? WEEKDAY_SH_TO_JS : WEEKDAY_JS_TO_SH)
  ALL_TRAINLINES[state.isReversed ? "sh_to_js" : "js_to_sh"]
  .filter(train => trainlines.includes(train.id))
  .filter(train => train["type"] <= state.trainType)
  .forEach(train => {
    timetable.push({
        id: train["id"],
        type: train.type === 3 ? '直达' : train.type === 2 ? '大站停' : '站站停',
        startTime: train.stops.find(stop => stop["station"] === state.start).startTime,
        endTime: train.stops.find(stop => stop["station"] === state.end).stopTime
    })
  });

  return timetable
}