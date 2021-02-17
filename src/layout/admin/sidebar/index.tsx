import React from 'react'
import { Drawer, List } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import ListItemLink from '@/components/ListItemLink'
import BackButton from '@/components/backBtn'

import NavList from './navList'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    webSidebar: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '5px'
    },
    webSidebarOpen: {
      width: drawerWidth,
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    webSidebarClose: {
      width: theme.spacing(7) + 1,
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    sidebarList: {
      flexGrow: 1
    }
  }))

const AdminSideBar = (props: LooseObj) => {

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
          <BackButton onBack="/" noLabel={true} />
          {NavList.map((nav, index) => {
          return <ListItemLink {...nav} key={nav.to || index} />})}
        </List>
      </Drawer>
    </>
  )
}

export default AdminSideBar