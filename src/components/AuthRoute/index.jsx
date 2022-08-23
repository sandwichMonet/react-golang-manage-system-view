// 判断token是否存在，如果存在直接正常进行路由跳转，如果不在则路由重定向至登录页面

import { Navigate } from 'react-router-dom'
import { getToken } from '@/utils'
import { message } from 'antd'

const AuthRoute = ({ children }) => {
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>
  } else {
    // 重定向到login
    return <Navigate to="/login" replace />
  }
}
export default AuthRoute
