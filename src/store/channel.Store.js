// 获取channel列表
import { makeAutoObservable } from 'mobx'
import { getChannels } from '@/api'

export class ChannelStore {
  channels = []
  constructor() {
    makeAutoObservable(this)
  }

  // 获取channel列表
  fetchChannel = async () => {
    const result = await getChannels()
    console.log('$$$$$$$', result.data.data.channels)
    this.channels = result.data.data.channels
    console.log('234234123', this.channels)
  }
}
