import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'

import WebUserInfo from './userInfo'
import './index.less'

const WebHeader = (props: LooseObj) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className="placeholder" />
          <WebUserInfo />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default WebHeader