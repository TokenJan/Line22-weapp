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
const scheduler_1 = require("../../actions/scheduler");
const station_1 = require("../../actions/station");
let Index = class Index extends taro_1.Component {
    constructor() {
        super(...arguments);
        this.onChangeStartStation = e => {
            this.props.selectStartStation(parseInt(e.detail.value));
        };
        this.onChangeEndStation = e => {
            this.props.selectEndStation(parseInt(e.detail.value));
        };
        this.onExchange = () => {
            this.props.exchangeStation();
        };
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
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    show() {
        taro_1.default.navigateTo({
            url: '/pages/timetable/index'
        });
    }
    render() {
        return (<components_1.View className='index'>
        <taro_ui_1.AtCard 
        // note='小Tips'
        // extra='额外信息'
        title='22号线时刻表'>
          <components_1.View className='at-row at-row__justify--around'>
            <components_1.View className='at-col at-col-4'>
              <components_1.Picker value={this.props.scheduler.start} mode='selector' range={this.props.scheduler.all} onChange={this.onChangeStartStation}>
                <components_1.View className='picker'>
                  <components_1.View className='at-icon at-icon-map-pin'>起始站：{this.props.scheduler.all[this.props.scheduler.start]}</components_1.View>
                </components_1.View>
              </components_1.Picker>
            </components_1.View>
            <components_1.View className='at-col at-col-1'>
              <taro_ui_1.AtButton type='secondary' size='small' circle={true} onClick={this.onExchange}><components_1.View className='at-icon at-icon-repeat-play'></components_1.View></taro_ui_1.AtButton>
            </components_1.View>
            <components_1.View className='at-col at-col-4'>
              <components_1.Picker value={this.props.scheduler.end} mode='selector' range={this.props.scheduler.all} onChange={this.onChangeEndStation}>
                <components_1.View className='picker'>
                <components_1.View className='at-icon at-icon-map-pin'>终点站：{this.props.scheduler.all[this.props.scheduler.end]}</components_1.View>
                </components_1.View>
              </components_1.Picker>
            </components_1.View>
          </components_1.View>
          <components_1.View className='at-row at-row__justify--around'>
            <components_1.View className='at-col at-col-5'>
              <taro_ui_1.AtButton type='secondary' size='small' onClick={this.props.selectWeekDay}>日常方案（今日）</taro_ui_1.AtButton>
            </components_1.View>
            <components_1.View className='at-col at-col-5'>
              <taro_ui_1.AtButton type='secondary' size='small' onClick={this.props.selectWeekEnd}>双休方案</taro_ui_1.AtButton>
            </components_1.View>
          </components_1.View>
          <taro_ui_1.AtButton type='primary' onClick={this.show}>查看</taro_ui_1.AtButton>
        </taro_ui_1.AtCard>
      </components_1.View>);
    }
};
Index = __decorate([
    redux_1.connect(({ scheduler }) => ({
        scheduler
    }), (dispatch) => ({
        selectWeekDay() {
            dispatch(scheduler_1.selectWeekDay());
        },
        selectWeekEnd() {
            dispatch(scheduler_1.selectWeekEnd());
        },
        selectStartStation(index) {
            dispatch(station_1.selectStartStation(index));
        },
        selectEndStation(index) {
            dispatch(station_1.selectEndStation(index));
        },
        exchangeStation() {
            dispatch(station_1.exchangeStation());
        }
    }))
], Index);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
exports.default = Index;
//# sourceMappingURL=index.jsx.map