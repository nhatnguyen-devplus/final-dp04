import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { postNewPassword } from '@app/redux/newPassword/actions'
import { Button, Col, Form, Input, notification, Row } from 'antd'
import { gapi } from 'gapi-script'
import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { response } = useSelector((state) => state.newPassword)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const newPassword = useCallback((values) => dispatch(postNewPassword(values)), [dispatch])

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    })
  }

  useEffect(() => {
    if (response) {
      if (response.status && 200 === response?.status) {
        navigate('/auth/login')
      }
    }
  }, [response])

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_CLIENT_ID,
        scope: 'email',
      })
    }
    gapi.load('client:auth2', start)
    newPassword()
  }, [])

  const handleLogin = (data) => {
    newPassword({
      data,
    })
  }
  const onFinish = (values) => {
    if (values.newPassword !== values.confirmNewPassword) {
      openNotificationWithIcon('error', 'Error: New password dissimilarity!')
    } else {
      handleLogin(values)
    }
  }
  return (
    <div className="login-page">
      {contextHolder}
      <Row justify="center">
        <h1>Reset password</h1>
      </Row>
      <Row justify="center">
        <Col className="login-parrent" md={6} sm={18} xs={20}>
          <h2>New password</h2>
          <Form
            className="login-form"
            form={form}
            initialValues={{
              remember: true,
            }}
            name="normal_login"
            size={'large'}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input placeholder="Email" prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input placeholder="Old Password" prefix={<LockOutlined className="site-form-item-icon" />} type="password" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your New Password!',
                },
              ]}
            >
              <Input
                placeholder="New Password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
              />
            </Form.Item>
            <Form.Item
              name="confirmNewPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your Confirm New Password!',
                },
              ]}
            >
              <Input
                placeholder="Confirm New Password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
              />
            </Form.Item>
            {response && '401' === response.status && (
              <p style={{ color: 'red' }}>You entered the wrong email or password</p>
            )}
            <Form.Item>
              <Button className="login-form-button" htmlType="submit" style={{ width: '100%' }} type="primary">
                Submit
              </Button>
            </Form.Item>
            <Link className="login-form-forgot" to='/auth/login'>
              Login?
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
export default ResetPassword
