import request from '@/utils/request'

// 登录模块

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
