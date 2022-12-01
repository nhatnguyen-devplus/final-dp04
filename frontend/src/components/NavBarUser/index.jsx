import React from 'react'
import { Dropdown, Space, Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './style.scss'
const items = [
  {
    label: <Link to="profile/edit">Chỉnh sửa tài khoản</Link>,
    key: 'user1',
  },
  {
    label: <Link to="profile/logout">Đăng xuất</Link>,
    key: 'user2',
  },
  {
    label: <Link to="/auth/login">Đăng nhập</Link>,
    key: 'user2',
  },
]
const NavBarUser = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
    className="user-nav"
  >
    <Link onClick={(e) => e.preventDefault()}>
      <Space>
        Nguyễn Quang Hiếu
        <Avatar src="https://joeschmoe.io/api/v1/random" />
      </Space>
    </Link>
  </Dropdown>
)
export default NavBarUser
