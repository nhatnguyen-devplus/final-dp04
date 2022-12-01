import React from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import { Link } from 'react-router-dom'
import './LogoTitle.scss'
const items = [
  {
    label: <Link to="https://www.antgroup.com">ST United</Link>,
    key: '0',
  },
  {
    label: <Link to="https://www.aliyun.com">DevPlus</Link>,
    key: '1',
  },
]
const LogoTitle = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <Link onClick={(e) => e.preventDefault()}>
      <Space className="logo-title">
        <h2>ST United</h2>
        <DownOutlined />
      </Space>
    </Link>
  </Dropdown>
)
export default LogoTitle
