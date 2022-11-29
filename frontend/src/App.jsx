import '@app/App.css'
import Dashboard from '@app/components/Dasboard/Dashboard'
import Layout from '@app/components/Layout/Layout'
import NotFound from '@app/components/NotFound/NotFound'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<>Home</>} path="/" />
        <Route element={<Dashboard />} path="dashboard" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Layout>
  )
}

export default App
