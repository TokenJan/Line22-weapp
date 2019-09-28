"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scheduler_1 = require("../constants/scheduler");
const station_1 = require("../constants/station");
const INITIAL_STATE = {
    isWeekend: false,
    all: ['金山卫', '金山园区', '亭林', '叶榭', '车墩', '新桥', '春申', '上海南站'],
    start: 0,
    end: 7,
    timetable: []
};
function scheduler(state = INITIAL_STATE, action) {
    switch (action.type) {
        case scheduler_1.WEEKDAY:
            return Object.assign(Object.assign({}, state), { isWeekend: false });
        case scheduler_1.WEEKEND:
            return Object.assign(Object.assign({}, state), { isWeekend: true });
        case station_1.START:
            return Object.assign(Object.assign({}, state), { start: action.index });
        case station_1.END:
            return Object.assign(Object.assign({}, state), { end: action.index });
        case station_1.EXCHANGE:
            return Object.assign(Object.assign({}, state), { start: state.end, end: state.start });
        default:
            return state;
    }
}
exports.default = scheduler;
//# sourceMappingURL=scheduler.js.map