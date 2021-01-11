import React from 'react'

import WebSideBar from './sidebar'
import AppMain from './AppMain'

const WebLayout = (props: LooseObj) => {

  return (
    <>
      <WebSideBar />
      <AppMain {...props} />
    </>
  )
}

export default WebLayout