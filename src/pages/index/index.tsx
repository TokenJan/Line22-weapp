import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtModal, AtIcon } from 'taro-ui'

import { ALL_STATIONS } from '../../constants/station'
import { selectWeekDay, selectWeekEnd, updateTimetable, selectStartStation, selectEndStation, exchangeStation } from '../../actions/timetableAction'
import { openModal, closeModal } from '../../actions/modalAction'

// #region 书写注意
// 
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  timetable: {
    isWeekend: boolean,
    isReverse: boolean,
    all: Array<String>, 
    start: number,
    end: number
    trainType: number
  },
  modal: {
    isOpened: boolean
  }
}

type PageDispatchProps = {
  selectWeekDay: () => void
  selectWeekEnd: () => void
  selectStartStation: (index: number) => void
  selectEndStation: (index: number) => void
  exchangeStation: () => void
  openModal: () => void
  closeModal: () => void
  updateTimetable: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ timetable, modal }) => ({
  timetable, modal
}), (dispatch) => ({
  selectWeekDay () {
    dispatch(selectWeekDay())
  },
  selectWeekEnd () {
    dispatch(selectWeekEnd())
  },
  selectStartStation (index: number) {
    dispatch(selectStartStation(index))
  },
  selectEndStation (index: number) {
    dispatch(selectEndStation(index))
  },
  exchangeStation () {
    dispatch(exchangeStation())
  },
  openModal () {
    dispatch(openModal())
  },
  closeModal () {
    dispatch(closeModal())
  },
  updateTimetable () {
    dispatch(updateTimetable())
  }
}))

class Index extends Component {
  
    onChangeStartStation = e => {
      this.props.selectStartStation(parseInt(e.detail.value))
      this.props.updateTimetable()
    }

    onChangeEndStation = e => {
      this.props.selectEndStation(parseInt(e.detail.value))
      this.props.updateTimetable()
    }

    onExchange = () => {
      this.props.exchangeStation()
      this.props.updateTimetable()
    }

    onSelectWeekDay = () => {
      this.props.selectWeekDay()
      this.props.updateTimetable()
    }

    onSelectWeekEnd = () => {
      this.props.selectWeekEnd()
      this.props.updateTimetable()
    }

    onConfirmModal = () => {
      this.props.closeModal()
    }
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

  componentWillReceiveProps () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentWillMount () { 
    this.props.updateTimetable()
  }

  showTimetable() {
    if (this.props.timetable.start === this.props.timetable.end) {
      this.props.openModal()
    } else {
      Taro.navigateTo({
        url: '/pages/timetable/index'
      })
    }
  }

  render () {
    return (
      <View className='index'>
        <View className='container'>
          <View className="at-row at-row__justify--between plan">
            <View className='at-col at-col-5 left label'>
              <View className='at-icon at-icon-map-pin'>起始站</View>
            </View>
            <View className='at-col at-col-5 right label'>
              <View className='at-icon at-icon-map-pin'>终点站</View>
            </View>
          </View>
          <View className='at-row at-row__justify--around plan'>
            <View className='at-col at-col-5 left'>
              <Picker value={this.props.timetable.start} mode='selector' range={ALL_STATIONS} onChange={this.onChangeStartStation}>
                <View className='picker'>
                  <span>{ALL_STATIONS[this.props.timetable.start]} </span> <AtIcon value='chevron-down'/>
                </View>
              </Picker>
            </View>
              <AtButton type='secondary' size='small' circle={true} onClick={this.onExchange} customStyle='border-color: white;'><AtIcon value='repeat-play' size='30'></AtIcon></AtButton>
            <View className='at-col at-col-5 right'>
              <Picker value={this.props.timetable.end} mode='selector' range={ALL_STATIONS} onChange={this.onChangeEndStation}>
                <View className='picker'>
                  <span>{ALL_STATIONS[this.props.timetable.end]}</span><AtIcon value='chevron-down'/>
                </View>
              </Picker>
            </View>
          </View>
          <View className='at-row at-row__justify--between plan'>
            <View className='at-col at-col-5'>
              <AtButton type='secondary' size='small' onClick={this.onSelectWeekDay} customStyle={this.props.timetable.isWeekend ? 'color: black; border-color: gray; opacity: 0.5;' : ''}>日常方案</AtButton>
            </View>
            <View className='at-col at-col-5'>
              <AtButton type='secondary' size='small' onClick={this.onSelectWeekEnd} customStyle={this.props.timetable.isWeekend ? '' : 'color: black; border-color: gray; opacity: 0.5;'}>双休方案</AtButton>
            </View>
          </View>
          <AtButton type='primary' onClick={this.showTimetable} customStyle={'font-weight:bold;'}>查看</AtButton>
          <AtModal
            isOpened={this.props.modal.isOpened}
            title='温馨提示'
            confirmText='确定'
            onConfirm={this.onConfirmModal}
            content='起始站和终点站不能相同，请重新选择'
          />
        </View>
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

export default Index as ComponentClass<PageOwnProps, PageState>
