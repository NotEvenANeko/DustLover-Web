import React from 'react'
import { Drawer, List } from '@material-ui/core'

import NavList from './navList'
import ListItemLink from './ListItemLink'

const WebSideBar = (props: LooseObj) => {
  return (
    <>
      <Drawer
        className="web-sidebar"
        variant="permanent"
        anchor="left">
        <List>
          {NavList.map(nav => {
            console.log(nav)
          return <ListItemLink {...nav} />})}
        </List>
      </Drawer>
    </>
  )
}

export default WebSideBar