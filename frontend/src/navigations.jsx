import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const navigations = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
]
