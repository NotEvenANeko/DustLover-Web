import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    describeText: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: theme.spacing(7) + 1,
      flexGrow: 1,
      marginTop: '25vh',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 'calc(10px + 2vmin)'
    }
  }))