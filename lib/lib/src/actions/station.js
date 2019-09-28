"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const station_1 = require("../constants/station");
exports.selectStartStation = (index) => {
    return {
        type: station_1.START,
        index: index
    };
};
exports.selectEndStation = (index) => {
    return {
        type: station_1.END,
        index: index
    };
};
exports.exchangeStation = () => {
    return {
        type: station_1.EXCHANGE
    };
};
//# sourceMappingURL=station.js.map