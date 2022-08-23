// 登录模块
import { makeAutoObservable } from 'mobx'
import { login } from '@/api'
import { getToken, setToken } from '@/utils'

export class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }

  reqLogin = async (moblie, code) => {
    const result = await login(moblie, code)
    this.token = result.token

    // 持久化token
    setToken(this.token)
  }
}
