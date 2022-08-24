import { Routes, Route } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import AuthRoute from '@/components/AuthRoute'
import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'

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
      >
        <Route index element={<Home />} />
        <Route path="article" element={<Article />} />
        <Route path="publish" element={<Publish />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default MyRoutes
