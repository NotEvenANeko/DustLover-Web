import React from 'react'
import { Drawer, List } from '@material-ui/core'

import NavList from './navList'
import ListItemLink from './ListItemLink'

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
        <List>
          {NavList.map((nav, index) => {
          return <ListItemLink {...nav} key={index} />})}
        </List>
      </Drawer>
    </>
  )
}

export default WebSideBar