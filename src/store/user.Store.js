import { makeAutoObservable } from 'mobx'
import { getUserInfo } from '@/api'

export class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }

  // 发送请求获取用户信息
  reqUserInfo = async () => {
    const result = await getUserInfo()
    this.userInfo = result.data.data
  }
}
