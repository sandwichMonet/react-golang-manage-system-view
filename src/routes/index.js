import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'
// import Layout from '@/pages/Layout'
// import Login from '@/pages/Login'
// import AuthRoute from '@/components/AuthRoute'
// import Home from '@/pages/Home'
// import Article from '@/pages/Article'
// import Publish from '@/pages/Publish'

// lazy-load component
const Layout = lazy(() => import('@/pages/Layout'))
const Login = lazy(() => import('@/pages/Login'))
const AuthRoute = lazy(() => import('@/components/AuthRoute'))
const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))
const CommunityActive = lazy(() => import('@/pages/CommunityActive'))
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
        <Route path="communityactive" element={<CommunityActive />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default MyRoutes
