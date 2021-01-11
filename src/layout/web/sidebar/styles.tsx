import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const drawerWidth = 240

export const useStyles = makeStyles((theme: Theme) => 
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