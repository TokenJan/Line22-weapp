import Taro, { Component } from '@tarojs/taro'
import { AtListItem } from 'taro-ui'


interface PageOwnProps {
    key: string,
    start: string,
    end: string,
    type: string
}

interface PageOwnState { }

export class TrainList extends Component<PageOwnProps, PageOwnState> {
    constructor(props) {
        super(props)
      }

    render() {
        const { key, start, end, type } = this.props
        console.log(this.props)
        return (
            <AtListItem key={key} start={start} end={end} extraText={type} />
        )
    }
    
}