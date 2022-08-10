// mobx index
import { LoginStore } from './login.Store'
import React from 'react'
class RootStore {
  constructor() {
    // 登录模块
    this.loginStore = new LoginStore()
  }
}

const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
