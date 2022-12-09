import { Layout as LayoutAntd } from 'antd'
import React, { useState } from 'react'
import LogoTitle from '../LogoTitle/LogoTitle'
import Header from './Header'
import MenuBar from './Menu'

const { Sider, Content } = LayoutAntd
const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <LayoutAntd
      style={{
        height: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div className="logo">
          <LogoTitle collapsed={collapsed} />
        </div>
        <MenuBar />
      </Sider>
      <LayoutAntd className="site-layout">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          className="site-layout-background"
          style={{
            margin: '0px',
            padding: 24,
            minHeight: 280,
            overflowY: 'auto',
          }}
        >
          {children}
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  )
}

export default Layout
