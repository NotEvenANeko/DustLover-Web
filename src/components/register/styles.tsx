import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    registerForm: {
      paddingTop: '10vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    registerInput: {
      minWidth: '100px',
      margin: theme.spacing(1)
    }
  }))