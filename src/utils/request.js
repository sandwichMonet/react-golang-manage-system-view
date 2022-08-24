import axios from 'axios'
import { getToken, removeToken } from './token'
import { history } from './history'
export const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 每次请求头中携带token
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

// 响应拦截器
request.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      // 如果token发生401错误则直接在清除该token并且跳转到登录页面
      removeToken()
      history.push('/login')
    }
    return Promise.reject(err)
  }
)

export default request
