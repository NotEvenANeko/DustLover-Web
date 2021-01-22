import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    formRoot: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(1)
    },
    btnGru: {
      alignSelf: 'flex-end',
      marginTop: '1vh',
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'center'
    }
  })
)