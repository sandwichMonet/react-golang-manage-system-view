// mobx index
import { LoginStore } from './login.Store'
import { UserStore } from './user.Store'
import React from 'react'
class RootStore {
  constructor() {
    // 登录模块
    this.loginStore = new LoginStore()
    // 用户信息模块
    this.userStore = new UserStore()
  }
}

const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
