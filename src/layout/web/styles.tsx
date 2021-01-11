import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const drawerWidth = 240

export const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    webContent: {
      marginLeft: theme.spacing(7) + 1,
      padding: theme.spacing(1)
    }
  }))