import { Drawer } from 'antd'
import React, { ReactNode } from 'react'

const DrawerComponent = ({children, onClose, open}: any) => {
  return (
    <Drawer
    width={640}
    placement="right"
    closable
    onClose={onClose}
    open={open}
  >
    {children}
    </Drawer>
  )
}

export default DrawerComponent