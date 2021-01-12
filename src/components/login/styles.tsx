import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginForm: {
      paddingTop: '10vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    loginInput: {
      minWidth: '100px',
      margin: theme.spacing(2)
    },
    superLink: {
      color: '#4848d4',
      '&:hover': {
        cursor: 'pointer'
      }
    }
  }))