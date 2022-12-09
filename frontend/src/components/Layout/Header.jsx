import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React from 'react'
import NavBarUser from '../NavBarUser'
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
    <NavBarUser />
  </HeaderAntd>
)

export default Header
