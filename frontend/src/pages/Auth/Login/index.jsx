import { Col, Divider, Row } from 'antd'
import { useCallback, useEffect } from 'react'
import LoginForm from '@app/components/LoginForm'
import LogoLogin from '@app/components/LoginLogo'
import GoogleLogin from 'react-google-login'
import './Login.scss'
import { gapi } from 'gapi-script'
import { useSelector, useDispatch } from 'react-redux'
import { getUserLogin, getUserByToken } from '@app/redux/login/actions'

const LoginPage = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn)
  const idToken = useSelector((state) => state.login.idToken)

  const dispatch = useDispatch()
  const userLogin = useCallback((values) => dispatch(getUserLogin(values)), [dispatch])
  const userByToken = useCallback(() => dispatch(getUserByToken()), [dispatch])
  const responseGoogle = (res) => {
    // console.log(res)
  }
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_CLIENT_ID,
        scope: 'email',
      })
    }
    gapi.load('client:auth2', start)
  }, [])
  useEffect(() => {
    userByToken()
  }, [isLoggedIn === true])
  const handleLogin = async (data) => {
    userLogin({
      data: data,
    })
  }
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
          <LoginForm handleLogin={(data) => handleLogin(data)} />
          <GoogleLogin
            clientId={import.meta.env.VITE_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Col>
      </Row>
    </div>
  )
}
export default LoginPage
