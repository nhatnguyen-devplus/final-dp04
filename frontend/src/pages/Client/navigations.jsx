import { HomeOutlined, LoginOutlined, PoweroffOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const clientNavigations = [
  {
    key: 'dashboard',
    icon: <HomeOutlined />,
    label: <Link to="dashboard">Dashboard</Link>,
  },
  {
    key: 'requests',
    icon: <LoginOutlined />,
    label: <Link to="requests">Requests</Link>,
  },
  {
    key: 'daysoff',
    icon: <PoweroffOutlined />,
    label: <Link to="daysoff">Days off</Link>,
  },
  {
    key: 'groups',
    icon: <UsergroupAddOutlined />,
    label: <Link to="groups">Groups</Link>,
  },
]
