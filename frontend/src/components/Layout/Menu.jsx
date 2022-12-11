import { navigations } from '@app/pages/Admin/navigations'
import { clientNavigations } from '@app/pages/Client/navigations'
import { Menu } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const MenuBar = () => {
  const { role } = useSelector((state) => state.login)
  const theme = 'dark'
  const [current, setCurrent] = useState('1')
  const onClick = (e) => {
    setCurrent(e.key)
  }
  return (
    <>
      <Menu
        defaultOpenKeys={['acc', 'mng']}
        items={'Admin' === role ? navigations : clientNavigations}
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
