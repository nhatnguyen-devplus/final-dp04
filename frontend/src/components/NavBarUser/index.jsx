import { EditOutlined, LogoutOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import './style.scss'
import Notifications from '@app/components/Notifications'
import { userLogOut } from '@app/redux/login/actions'
import { Dropdown, Space, Avatar, Button } from 'antd'
import { useCallback } from 'react'
import { useGoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const NavBarUser = () => {
  const { role, data } = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const logOut = useCallback(() => dispatch(userLogOut()), [dispatch])

  const navigate = useNavigate()
  const onLogoutSuccess = () => {
    navigate('/auth/login')
  }

  const onFailure = () => {
    console.error('logout fail')
  }

  const { signOut } = useGoogleLogout({
    onFailure,
    clientId: import.meta.env.VITE_CLIENT_ID,
    onLogoutSuccess,
  })
  const handleLogOut = () => {
    localStorage.removeItem('token')
    logOut()
    signOut()
  }
  const items = [
    {
      label: (
        <Link to="profile/edit">
          <EditOutlined /> Edit profile
        </Link>
      ),
      key: 'user1',
    },
    {
      label: (
        <Link to="/auth/login" onClick={() => handleLogOut()}>
          <LogoutOutlined /> Log Out
        </Link>
      ),
      key: 'user2',
    },
  ]
  return (
    <div className="user-nav">
      {'Admin' !== role ? (
        <Link to="/client/logoff/create">
          <Button className="btn-logoff" icon={<PlusOutlined />} type="primary">
            Log Off
          </Button>
        </Link>
      ) : (
        <></>
      )}
      <Notifications />
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
      >
        <Link onClick={(e) => e.preventDefault()}>
          <Space>
            {data?.name}
            <Avatar icon={<UserOutlined />} src={data.avatar ? data.avatar : null} />
          </Space>
        </Link>
      </Dropdown>
    </div>
  )
}
export default NavBarUser
