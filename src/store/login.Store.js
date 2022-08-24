// 登录模块
import { makeAutoObservable } from 'mobx'
import { login } from '@/api'
import { getToken, removeToken, setToken } from '@/utils'

export class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }

  // 登录
  reqLogin = async (moblie, code) => {
    const result = await login(moblie, code)
    this.token = result.data.data.token

    // 持久化token
    console.log(this.token)
    setToken(this.token)
  }

  // 退出登录
  loginOut = () => {
    this.token = ''
    // 清除token
    removeToken()
  }
}
