import { Layout, Menu, message, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'

const { Header, Sider } = Layout

const ViewLayout = () => {
  // 获取到当前路径名设置menu对应item高亮
  const location = useLocation()
  const selectedKey = location.pathname

  // 获取用户信息
  const { userStore, loginStore } = useStore()

  useEffect(() => {
    try {
      userStore.reqUserInfo()
    } catch {}
  }, [userStore])

  // 退出登录回调函数
  const navigate = useNavigate()
  const loginOut = () => {
    loginStore.loginOut()
    message.success('退出成功')
    navigate('/login')
  }

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="openSider">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          })}
        </div>
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={loginOut}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background" trigger={null} collapsible collapsed={collapsed}>
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: `数据概览`,
                onClick: () => {
                  navigate('/')
                }
              },
              {
                key: '2',
                icon: <DiffOutlined />,
                label: '内容管理',
                onClick: () => {
                  navigate('/article')
                }
              },
              {
                key: '3',
                icon: <EditOutlined />,
                label: '发布文章',

                onClick: () => {
                  navigate('/publish')
                }
              }
            ]}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(ViewLayout)
