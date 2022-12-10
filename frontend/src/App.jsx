import '@app/App.css'
import NotFound from '@app/components/NotFound/NotFound'
import Index from '@app/pages/Admin'
import Auth from '@app/pages/Auth'
import { Routes, Route } from 'react-router-dom'
const App = () => (
  <>
    <Routes>
      <Route element={<Index />} path="admin/*" />
      <Route element={<Auth />} path="auth/*" />
      <Route element={<NotFound />} path="*" />
    </Routes>
  </>
)

export default App
