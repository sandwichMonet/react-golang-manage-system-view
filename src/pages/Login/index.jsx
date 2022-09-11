import { Form, Input, Checkbox, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useStore } from '@/store'
import loginImg from '@/assets/login.svg'
import registerImg from '@/assets/register.svg'
import { GithubOutlined, QqOutlined, WechatOutlined, WeiboOutlined } from '@ant-design/icons'
import './index.scss'
const Login = () => {
  // 使用编程式导航
  const navigate = useNavigate()
  const { loginStore } = useStore()
  // 点击登录按钮时触发 参数values即是表单输入数据
  const onLogin = async values => {
    const { mobile, code } = values
    try {
      await loginStore.reqLogin(mobile, code)
      navigate('/')
      message.success('登录成功')
    } catch (err) {
      message.error(err.response?.data?.message || '登录失败')
    }
  }
  const onRegister = () => {
    // todo:注册功能
    message.warning('暂未开启注册功能,请联系管理人员!')
  }

  const [signUpMode, setSignUpMode] = useState(false)
  return (
    <div className="login">
      <div className={signUpMode ? 'container sign-up-mode' : 'container'}>
        <div className="forms-container">
          <div className="signin-signup">
            <Form
              initialValues={{ mobile: '13811111111', code: '246810', remember: true }}
              validateTrigger={['onBlur', 'onChange']}
              onFinish={onLogin}
              className="sign-in-form"
            >
              <h2 className="title">管理员登录</h2>
              <Form.Item
                className="input-field"
                name="mobile"
                rules={[
                  {
                    pattern: /^1[3-9]\d{9}$/,
                    message: '手机号格式错误',
                    validateTrigger: 'onBlur'
                  },
                  { required: true, message: '请输入手机号' }
                ]}
              >
                <Input size="large" placeholder="请输入手机号" />
              </Form.Item>
              <Form.Item
                className="input-field"
                name="code"
                rules={[
                  { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' },
                  { required: true, message: '请输入验证码' }
                ]}
              >
                <Input size="large" placeholder="请输入验证码" />
              </Form.Item>
              <Form.Item>
                <Button className="btn solid" type="primary" htmlType="submit" size="large">
                  登录
                </Button>
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="login-checkbox-label">我已阅读并同意「管理者手册」和「居民隐私条款」</Checkbox>
              </Form.Item>
              <Form.Item>
                <p className="social-text">选择以下其他方式登录</p>
                <div className="social-media">
                  <GithubOutlined className="social-icon" />
                  <WeiboOutlined className="social-icon" />
                  <WechatOutlined className="social-icon" />
                  <QqOutlined className="social-icon" />
                </div>
              </Form.Item>
            </Form>
            <Form
              initialValues={{ remember: true }}
              validateTrigger={['onBlur', 'onChange']}
              onFinish={onRegister}
              className="sign-up-form"
            >
              <h2 className="title">管理员注册</h2>
              <Form.Item
                className="input-field"
                name="mobile"
                rules={[
                  {
                    pattern: /^1[3-9]\d{9}$/,
                    message: '手机号格式错误',
                    validateTrigger: 'onBlur'
                  },
                  { required: true, message: '请输入手机号' }
                ]}
              >
                <Input size="large" placeholder="请输入手机号" />
              </Form.Item>
              <Form.Item
                className="input-field"
                name="email"
                rules={[
                  {
                    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                    message: '邮箱格式错误',
                    validateTrigger: 'onBlur'
                  },
                  { required: true, message: '请输入邮箱' }
                ]}
              >
                <Input size="large" placeholder="请输入工作邮箱" />
              </Form.Item>
              <Form.Item>
                <Button className="btn solid" type="primary" htmlType="submit" size="large">
                  注册
                </Button>
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="login-checkbox-label">我已阅读并同意「管理者手册」和「居民隐私条款」</Checkbox>
              </Form.Item>
              <Form.Item>
                <p className="social-text">选择以下其他方式登录</p>
                <div className="social-media">
                  <GithubOutlined className="social-icon" />
                  <WeiboOutlined className="social-icon" />
                  <WechatOutlined className="social-icon" />
                  <QqOutlined className="social-icon" />
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>新员工?</h3>
              <p>
                如遇到问题与改进建议请点击 <a href="https://monetzone.top">这里</a> 联系我们。
              </p>
              <button className="btn transparent" id="sign-up-btn" onClick={() => setSignUpMode(true)}>
                注 册
              </button>
            </div>
            <img src={loginImg} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>已是管理员?</h3>
              <p>
                如遇到问题与改进建议请点击 <a href="https://monetzone.top">这里</a> 联系我们。
              </p>
              <button className="btn transparent" id="sign-in-btn" onClick={() => setSignUpMode(false)}>
                登 录
              </button>
            </div>
            <img src={registerImg} className="image" alt="registerImg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
