import React from 'react'
import { Drawer, List } from '@material-ui/core'

import NavList from './navList'
import ListItemLink from '@/components/ListItemLink'
import UserInfo from './userInfo'

import { useStyles } from './styles'

const WebSideBar = (props: LooseObj) => {

  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleMouseEnter = () => {
    setOpen(true)
  }

  const handleMouseLeave = () => {
    setOpen(false)
  }

  return (
    <>
      <Drawer
        className={`${classes.webSidebar} ${open ? classes.webSidebarOpen : classes.webSidebarClose}`}
        classes={{
          paper: open ? classes.webSidebarOpen : classes.webSidebarClose
        }}
        variant="permanent"
        anchor="left"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <List className={`${classes.sidebarList}`}>
          {NavList.map((nav, index) => {
          return <ListItemLink {...nav} key={nav.to || index} />})}
        </List>
        <UserInfo />
      </Drawer>
    </>
  )
}

export default WebSideBar