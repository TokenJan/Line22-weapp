"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const redux_1 = require("@tarojs/redux");
const taro_ui_1 = require("taro-ui");
const station_1 = require("../../constants/station");
let Timetable = class Timetable extends taro_1.Component {
    constructor() {
        super(...arguments);
        /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */
        this.config = {
            navigationBarTitleText: '金山铁路22号线时刻表'
        };
    }
    componentWillMount() {
        this.props.scheduler.timetable = [];
        station_1.TIMETABLE_JS_TO_SH.forEach(train => {
            this.props.scheduler.timetable.push({
                startTime: train["stops"].find(stop => stop["station"] === this.props.scheduler.start).startTime,
                endTime: train["stops"].find(stop => stop["station"] === this.props.scheduler.end).stopTime
            });
        });
        console.log(this.props.scheduler);
    }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    render() {
        const scrollTop = 55;
        const Threshold = 20;
        const startStation = this.props.scheduler.all[this.props.scheduler.start];
        const endStation = this.props.scheduler.all[this.props.scheduler.end];
        return (<components_1.ScrollView className='scrollview' scrollY scrollWithAnimation scrollTop={scrollTop} lowerThreshold={Threshold} upperThreshold={Threshold}>       
                <taro_ui_1.AtList>
                    {this.props.scheduler.timetable.map((item, index) => <taro_ui_1.AtListItem key={index} note={startStation + item["startTime"] + endStation + item["endTime"]}/>)}
                </taro_ui_1.AtList>
            </components_1.ScrollView>);
    }
};
Timetable = __decorate([
    redux_1.connect(({ scheduler }) => ({
        scheduler
    }), null)
], Timetable);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
exports.default = Timetable;
//# sourceMappingURL=index.jsx.map