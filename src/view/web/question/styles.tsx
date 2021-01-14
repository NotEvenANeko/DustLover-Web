import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      padding: theme.spacing(1),
      minHeight: '50vh'
    },
    text: {
      minHeight: '20vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: theme.spacing(1)
    }
  })
)