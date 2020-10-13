import React from 'react'

import WebSideBar from './sidebar'
import AppMain from './AppMain'
import WebHeader from './header'

const WebLayout = (props: LooseObj) => {
  return (
    <>
      <WebHeader />
      <WebSideBar />
      <AppMain {...props} />
    </>
  )
}

export default WebLayout