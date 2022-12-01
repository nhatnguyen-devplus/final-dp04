import '@app/App.css'
import NotFound from '@app/components/NotFound/NotFound'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './Login'
const Auth = () => {
  return (
    <Routes>
      <Route element={<LoginPage />} path="login" />
      <Route element={<>Register</>} path="register" />
      
    </Routes>
  )
}

export default Auth
