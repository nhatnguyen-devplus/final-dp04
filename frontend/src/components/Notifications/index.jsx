import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, Button, Space } from 'antd'
import { Dropdown, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
// import '@app/components/Notifications/Notifications.scss'
import './Notification.scss'

const { Text } = Typography
const items = [
  {
    label: (
      <Text strong className="noties-title">
        Notifications <FontAwesomeIcon icon={faBell} />
      </Text>
    ),
    key: '0',
  },
  {
    label: <Link to="requests">Nguyem Quang Hieu approved your request</Link>,
    key: '1',
  },
  {
    label: <Link to="requests">Nguyem Quang Hieu rejected your request</Link>,
    key: '2',
  },
  {
    label: <Link to="requests">Nguyem Quang Hieu approved your request</Link>,
    key: '3',
  },
  {
    label: <Link to="requests">Nguyem Quang Hieu approved your request with commit: Have a good day </Link>,
    key: '4',
  },
  {
    label: <Link to="requests">Nguyem Quang Hieu rejected your request</Link>,
    key: '2',
  },
  {
    label: <Link to="requests">Nguyem Quang Hieu approved your request</Link>,
    key: '3',
  },
  {
    label: <Link to="requests">Nguyem Quang Hieu approved your request with commit: Have a good day </Link>,
    key: '4',
  },
]
const countNoti = items.length - 1

const Notifications = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <a style={{ marginRight: '20px' }} onClick={(e) => e.preventDefault()}>
      <Space size="middle">
        <Badge count={countNoti} size="small">
          <Button icon className="noties-btn" shape="circle">
            <FontAwesomeIcon icon={faBell} />
          </Button>
        </Badge>
      </Space>
    </a>
  </Dropdown>
)

export default Notifications
