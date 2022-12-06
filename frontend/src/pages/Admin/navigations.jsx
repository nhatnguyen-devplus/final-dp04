import { UserOutlined, AlignLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const navigations = [
  {
    key: 'acc',
    icon: <UserOutlined />,
    label: 'Account',
    children: [
      {
        key: 'acc1',
        label: <Link to="dashboard">Dashboard</Link>,
      },
      {
        key: 'acc2',
        label: <Link to="requests">Request</Link>,
      },
      {
        key: 'acc3',
        label: <Link to="daysoff">Days off</Link>,
      },
    ],
  },
  {
    key: 'mng',
    icon: <AlignLeftOutlined />,
    label: 'Manager',
    children: [
      {
        key: 'mng1',
        label: <Link to="members">Members</Link>,
      },
      {
        key: 'mng2',
        label: <Link to="groups">Groups</Link>,
      },
      {
        key: 'mng3',
        label: <Link to="notifications">Notifications</Link>,
      },
      {
        key: 'mng4',
        label: <Link to="sync">Sync</Link>,
      },
    ],
  },
]
