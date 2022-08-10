// 登录模块
import { makeAutoObservable } from 'mobx'
import { login } from '@/api'

export class LoginStore {
  token = ''
  constructor() {
    makeAutoObservable(this)
  }

  reqLogin = async (moblie, code) => {
    const result = await login()
    this.token = result.token
  }
}
