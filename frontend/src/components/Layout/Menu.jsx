import { navigations } from '@app/pages/Admin/navigations'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

const MenuBar = () => {
  const [theme, setTheme] = useState('dark')
  const [current, setCurrent] = useState('1')
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light')
  }
  const onClick = (e) => {
    setCurrent(e.key)
  }
  return (
    <>
      <Menu
        theme={theme}
        onClick={onClick}
        style={{
          width: '100%',
        }}
        defaultOpenKeys={['acc', 'mng']}
        selectedKeys={[current]}
        mode="inline"
        items={navigations}
      />
    </>
  )
}
export default MenuBar
