import { navigations } from '@app/pages/Admin/navigations'
import { Menu } from 'antd'
import React, { useState } from 'react'

const MenuBar = () => {
  const theme = 'dark'
  const [current, setCurrent] = useState('1')
  const onClick = (e) => {
    setCurrent(e.key)
  }
  return (
    <>
      <Menu
        defaultOpenKeys={['acc', 'mng']}
        items={navigations}
        mode="inline"
        selectedKeys={[current]}
        style={{
          width: '100%',
        }}
        theme={theme}
        onClick={onClick}
      />
    </>
  )
}
export default MenuBar
