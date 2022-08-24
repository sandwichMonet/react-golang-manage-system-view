import { request } from '@/utils'

// 登录
export const login = (mobile, code) =>
  request({
    url: 'http://geek.itheima.net/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })

// 获取用户信息
export const getUserInfo = () =>
  request({
    url: '/user/profile',
    method: 'GET'
  })
