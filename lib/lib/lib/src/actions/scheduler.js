"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scheduler_1 = require("../constants/scheduler");
exports.selectWeekDay = () => {
    return {
        type: scheduler_1.WEEKDAY
    };
};
exports.selectWeekEnd = () => {
    return {
        type: scheduler_1.WEEKEND
    };
};
//# sourceMappingURL=scheduler.js.map