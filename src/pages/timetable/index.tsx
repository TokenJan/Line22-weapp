import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { TrainList } from '../../components/list/index'
import { AtList } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { ALL_STATIONS } from '../../constants/station'


// #region 书写注意
// 
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

interface PageState {
    timetable: {
        start: number,
        end: number,
        timetable: Station[]
    }
 }

type IProps =  PageState

interface Timetable {
  props: IProps;
}

 interface Station {
    id: string,
    type: string,
    startTime: string,
    endTime: string
  }

  @connect(({ timetable }) => ({
    timetable
  }), null)

class Timetable extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
        navigationBarTitleText: '金山铁路时刻表',
        navigationBarTextStyle: 'white',
        navigationBarBackgroundColor: '#6190E8'
    }

  componentWillMount() {}

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const scrollTop = 100
    const Threshold = 20
    const startStation = ALL_STATIONS[this.props.timetable.start]
    const endStation = ALL_STATIONS[this.props.timetable.end]

    return (
        <View className="index">
            <View className="sticky-top">
                <AtList isHeader={true} hasBorder={false}>
                    <TrainList key={'id'} start={startStation} end={endStation} type={'今日方案'} />
                </AtList>
            </View>
            <ScrollView
                className='scrollview'
                scrollY
                scrollWithAnimation
                scrollTop={scrollTop}
                lowerThreshold={Threshold}
                upperThreshold={Threshold}
            >
                <AtList>
                    {this.props.timetable.timetable.map((item) => <TrainList key={item.id} start={item["startTime"]} end={item["endTime"]} type={item.type} />)}
                </AtList>
            </ScrollView>
        </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Timetable as ComponentClass<PageState>
