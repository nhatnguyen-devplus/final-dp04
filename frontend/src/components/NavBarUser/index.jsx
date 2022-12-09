import { PlusOutlined } from '@ant-design/icons'
import './style.scss'
import { userLogOut } from '@app/redux/login/actions'
import { Dropdown, Space, Avatar, Button } from 'antd'
import { useCallback } from 'react'
import { useGoogleLogout } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const NavBarUser = () => {
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
      label: <Link to="profile/edit">Edit profile</Link>,
      key: 'user1',
    },
    {
      label: (
        <Link to="/auth/login" onClick={() => handleLogOut()}>
          Log Out
        </Link>
      ),
      key: 'user2',
    },
  ]
  return (
    <div className="user-nav">
      <Link to="/admin/logoff/create">
        <Button className="btn-logoff" icon={<PlusOutlined />} type="primary">
          Log Off
        </Button>
      </Link>
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
      >
        <Link onClick={(e) => e.preventDefault()}>
          <Space>
            Nguyễn Quang Hiếu
            <Avatar src="https://joeschmoe.io/api/v1/random" />
          </Space>
        </Link>
      </Dropdown>
    </div>
  )
}
export default NavBarUser
