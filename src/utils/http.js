import axios from 'axios'
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 请求拦截器
http.interceptors.request.use(
  config => config,
  err => Promise.reject(err)
)

// 响应拦截器
http.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
)

export { http }
