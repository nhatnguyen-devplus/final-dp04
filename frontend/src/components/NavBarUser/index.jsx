import { Dropdown, Space, Avatar, Button } from 'antd'
import { Link } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import './style.scss'
const items = [
  {
    label: <Link to="profile/edit">Edit profile</Link>,
    key: 'user1',
  },
  {
    label: <Link to="profile/logout">Log Out</Link>,
    key: 'user2',
  },
  {
    label: <Link to="/auth/login">Login</Link>,
    key: 'user2',
  },
]
const NavBarUser = () => (
  <div className="user-nav">
    <Link to="/admin/logoff/create">
      <Button className="btn-logoff" type="primary" icon={<PlusOutlined />}>
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
export default NavBarUser
