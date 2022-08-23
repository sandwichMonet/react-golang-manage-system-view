import { Routes, Route } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import AuthRoute from '@/components/AuthRoute'

const MyRoutes = () => {
  return (
    <Routes>
      {/* 通过高阶组件AuthRoute鉴权 */}
      <Route
        path="/"
        element={
          <AuthRoute>
            <Layout />
          </AuthRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default MyRoutes
