import LoginForm from '@app/components/LoginForm'
import LogoLogin from '@app/components/LoginLogo'
import { Col, Row } from 'antd'
import { useCallback, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import './Login.scss'
import { gapi } from 'gapi-script'
import { useSelector, useDispatch } from 'react-redux'
import { getUserLogin, getUserByToken } from '@app/redux/login/actions'

const LoginPage = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn)
  const dispatch = useDispatch()
  const userLogin = useCallback((values) => dispatch(getUserLogin(values)), [dispatch])
  const userByToken = useCallback(() => dispatch(getUserByToken()), [dispatch])
  const responseGoogle = () => {
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
  }, [true === isLoggedIn])
  const handleLogin = async (data) => {
    userLogin({
      data,
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
        <Col className="login-parrent" md={6} sm={18} xs={20}>
          <h2>Login</h2>
          <LoginForm handleLogin={(data) => handleLogin(data)} />
          <GoogleLogin
            buttonText="Login"
            clientId={import.meta.env.VITE_CLIENT_ID}
            cookiePolicy={'single_host_origin'}
            onFailure={responseGoogle}
            onSuccess={responseGoogle}
          />
        </Col>
      </Row>
    </div>
  )
}
export default LoginPage
