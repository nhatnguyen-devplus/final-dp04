import { PlusOutlined } from '@ant-design/icons'
import './style.scss'
import { userLogOut } from '@app/redux/login/actions'
import { Dropdown, Space, Avatar, Button } from 'antd'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBarUser = () => {
  const dispatch = useDispatch()
  const logOut = useCallback(() => dispatch(userLogOut()), [dispatch])
  const handleLogOut = () => {
    localStorage.removeItem('token')
    logOut()
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
    {
      label: <Link to="/auth/login">Login</Link>,
      key: 'user3',
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
