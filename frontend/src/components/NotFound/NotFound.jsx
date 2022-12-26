import { getUserByToken } from '@app/redux/login/actions'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const NotFound = () => {
  const { isLoggedIn, role } = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const userByToken = useCallback(() => dispatch(getUserByToken()), [dispatch])
  useEffect(() => {
    userByToken()
  }, [])
  return <>{role && isLoggedIn ? <Navigate to="/404" /> : <Navigate to="/auth/login" />}</>
}
export default NotFound
