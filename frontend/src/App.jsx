import '@app/App.css'
import NotFound from '@app/components/NotFound/NotFound'
import { Routes, Route } from 'react-router-dom'
import Index from '@app/pages/Admin'
import Auth from '@app/pages/Auth'

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Auth />} path="auth/*" />
        <Route element={<Index />} path="admin/*" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  )
}

export default App
