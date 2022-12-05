import '@app/App.css'
import Dashboard from '@app/components/Dasboard/Dashboard'
import Layout from '@app/components/Layout/Layout'
import NotFound from '@app/components/NotFound/NotFound'
import { Routes, Route } from 'react-router-dom'
import Requests from '@app/components/Requests/Requests'
import DetailsRequest from '@app/components/Requests/DetailsRequest'
import LogOffForm from '@app/components/LogOff'
import Groups from '@app/components/Groups'
import Members from '@app/components/Members'
import CreateMember from '@app/components/Members/create'
import './style.scss'
const Index = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route element={<Dashboard />} path="dashboard" />
          <Route element={<Requests />} path="requests" />
          <Route element={<DetailsRequest />} path="requests/details/:id" />
          <Route element={<LogOffForm />} path="logoff/create" />
          <Route element={<Groups />} path="groups" />
          <Route element={<Members />} path="members" />
          <Route element={<CreateMember />} path="members/create" />
          {/* <Route element={<NotFound />} path="*" /> */}
        </Routes>
      </Layout>
    </>
  )
}

export default Index
