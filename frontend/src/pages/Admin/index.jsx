import '@app/App.css'
import Dashboard from '@app/components/Dasboard/Dashboard'
import Daysoff from '@app/components/Daysoff'
import DetailsDayOff from '@app/components/Daysoff/details'
import Groups from '@app/components/Groups'
import CreateGroup from '@app/components/Groups/create'
import DetailsGroups from '@app/components/Groups/details'
import Layout from '@app/components/Layout/Layout'
import LogOffForm from '@app/components/LogOff'
import Members from '@app/components/Members'
import CreateMember from '@app/components/Members/create'
import DetailsMember from '@app/components/Members/details'
import NotFound from '@app/components/NotFound/NotFound'
import DetailsRequest from '@app/components/Requests/DetailsRequest'
import Requests from '@app/components/Requests/Requests'
import SlackChannels from '@app/components/SlackChannels'
import './style.scss'
// import { checkToken } from '@app/redux/login/services'
import { getUserByToken } from '@app/redux/login/actions'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
const Index = () => {
  const { isLoggedIn, loading, role } = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const userByToken = useCallback(() => dispatch(getUserByToken()), [dispatch])
  useEffect(() => {
    userByToken()
  }, [])
  return (
    <>
      {!loading && (
        <>
          {!isLoggedIn ? (
            <Navigate to="/auth/login" />
          ) : 'Admin' === role ? (
            <Layout>
              <Routes>
                <Route element={<Dashboard />} path="dashboard" />
                <Route element={<Requests />} path="requests" />
                <Route element={<DetailsRequest />} path="requests/details/:id" />
                <Route element={<LogOffForm />} path="logoff/create" />
                <Route element={<Groups />} path="groups" />
                <Route element={<CreateGroup />} path="groups/create" />
                <Route element={<DetailsGroups />} path="groups/details/:id" />
                <Route element={<Members />} path="members" />
                <Route element={<CreateMember />} path="members/create" />
                <Route element={<DetailsMember />} path="members/details/:id" />
                <Route element={<Daysoff />} path="daysoff" />
                <Route element={<DetailsDayOff />} path="daysoff/details/:id" />
                <Route element={<SlackChannels />} path="broadcast/slack" />
              </Routes>
            </Layout>
          ) : (
            <Routes>
              <Route element={<NotFound />} path="*" />
            </Routes>
          )}
        </>
      )}
    </>
  )
}

export default Index
