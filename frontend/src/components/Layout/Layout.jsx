import { navigations } from '@app/navigations'
import { Layout as LayoutAntd, Menu } from 'antd'
import React, { useState } from 'react'
import Header from './Header'

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
        <div className="logo" />
        <Menu defaultSelectedKeys={['1']} items={navigations} mode="inline" theme="dark" />
      </Sider>
      <LayoutAntd className="site-layout">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
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
