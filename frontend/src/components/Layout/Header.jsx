import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React from 'react'
const { Header: HeaderAntd } = Layout

const Header = ({ collapsed, setCollapsed }) => (
  <HeaderAntd
    className="site-layout-background"
    style={{
      padding: 0,
    }}
  >
    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: () => setCollapsed(!collapsed),
    })}
  </HeaderAntd>
)

export default Header
