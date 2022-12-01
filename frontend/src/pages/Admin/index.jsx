import '@app/App.css'
import Dashboard from '@app/components/Dasboard/Dashboard'
import Layout from '@app/components/Layout/Layout'
import NotFound from '@app/components/NotFound/NotFound'
import { Routes, Route } from 'react-router-dom'
// import Requests from '@app/components/Requests/Requests'
import './style.scss'
const Index = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route element={<Dashboard />} path="dashboard" />
          {/* <Route element={<Requests />} path="requests" /> */}
          {/* <Route element={<NotFound />} path="*" /> */}
        </Routes>
      </Layout>
    </>
  )
}

export default Index
