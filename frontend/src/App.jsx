import '@app/App.css'
import NotFound from '@app/components/NotFound/NotFound'
import Index from '@app/pages/Admin'
import Auth from '@app/pages/Auth'
import ResetPassword from '@app/pages/Auth/ResetPassword'
import Client from '@app/pages/Client'
import { Routes, Route } from 'react-router-dom'
import NotExist from './components/NotFound/NotExist'
const App = () => (
  <>
    <Routes>
      <Route element={<Index />} path="admin/*" />
      <Route element={<Client />} path="client/*" />
      <Route element={<Auth />} path="auth/*" />
      <Route element={<ResetPassword />} path="reset-password/" />
      <Route element={<NotFound />} path="*" />
      <Route element={<NotExist />} path="/404" />
    </Routes>
  </>
)

export default App
