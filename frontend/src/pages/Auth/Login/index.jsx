import { Col, Divider, Row } from 'antd'
import LoginForm from '@app/components/LoginForm'
import LogoLogin from '@app/components/LoginLogo'
import './Login.scss'
const LoginPage = () => {
  return (
    <div className="login-page">
      <Row justify="center">
        <LogoLogin />
      </Row>
      <Row justify="center">
        <h1>First, you need to Login</h1>
        <p></p>
      </Row>
      <Row justify="center">
        <Col sm={18} xs={20} md={6} className="login-parrent">
          <h2>Login</h2>
          <LoginForm />
        </Col>
      </Row>
    </div>
  )
}
export default LoginPage
