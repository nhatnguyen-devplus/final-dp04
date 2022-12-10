import '@app/App.css'
import Dashboard from '@app/components/Dasboard/Dashboard'
import Groups from '@app/components/Groups'
import Layout from '@app/components/Layout/Layout'
import LogOffForm from '@app/components/LogOff'
import NotFound from '@app/components/NotFound/NotFound'
import Requests from '@app/components/Requests/Requests'
// import { checkToken } from '@app/redux/login/services'
import { getUserByToken } from '@app/redux/login/actions'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
const Index = () => {
  const { isLoggedIn, loading, isRole } = useSelector((state) => state.login)
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
          ) : 'Admin' !== isRole ? (
            <Layout>
              <Routes>
                <Route element={<Dashboard />} path="dashboard" />
                <Route element={<Requests />} path="requests" />
                <Route element={<LogOffForm />} path="logoff/create" />
                <Route element={<Groups />} path="groups" />
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
