import axios from 'axios'
import { getToken } from './token'
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
  err => Promise.reject(err)
)

export default request
