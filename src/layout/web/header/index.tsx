import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'

import WebUserInfo from './userInfo'
import { useStyles } from './styles'

const WebHeader = (props: LooseObj) => {

  const classes = useStyles()

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.placeHolder} />
          <WebUserInfo />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default WebHeader