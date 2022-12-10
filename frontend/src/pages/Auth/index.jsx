import '@app/App.css'
import { getUserByToken } from '@app/redux/login/actions'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './Login'
const Auth = () => {
  const { isLoggedIn, role } = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const userByToken = useCallback(() => dispatch(getUserByToken()), [dispatch])
  useEffect(() => {
    userByToken()
  }, [])

  return (
    <>
      {role && isLoggedIn ? (
        'Admin' === role ? (
          <Navigate to="/admin" />
        ) : (
          <Navigate to="/client" />
        )
      ) : (
        <Routes>
          <Route element={<LoginPage />} path="login" />
          <Route element={<>Register</>} path="register" />
        </Routes>
      )}
    </>
  )
}

export default Auth
