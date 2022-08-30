// mobx index
import { LoginStore } from './login.Store'
import { UserStore } from './user.Store'
import React from 'react'
import { ChannelStore } from './channel.Store'
class RootStore {
  constructor() {
    // 登录模块
    this.loginStore = new LoginStore()
    // 用户信息模块
    this.userStore = new UserStore()
    // 获取channel列表
    this.channelStore = new ChannelStore()
  }
}

const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
