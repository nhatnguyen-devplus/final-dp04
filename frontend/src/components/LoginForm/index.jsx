import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const LoginForm = ({ handleLogin }) => {
  const [form] = Form.useForm()
  const { response } = useSelector((state) => state.login)
  const onFinish = (values) => {
    form.resetFields(['password'])
    handleLogin(values)
  }
  return (
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
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input placeholder="Password" prefix={<LockOutlined className="site-form-item-icon" />} type="password" />
      </Form.Item>
      {response && '401' === response.status ? (
        <p style={{ color: 'red' }}>You entered the wrong email or password</p>
      ) : (
        <></>
      )}
      <Form.Item>
        <Form.Item noStyle name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" to="">
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button className="login-form-button" htmlType="submit" style={{ width: '100%' }} type="primary">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}
export default LoginForm
