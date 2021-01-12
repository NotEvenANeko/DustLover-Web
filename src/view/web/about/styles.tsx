import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    cardRoot: {
      border: 'none',
      paddingLeft: '5vw',
      paddingTop: '2vh',
      paddingRight: theme.spacing(7) + 1
    },
    formRoot: {
      display: 'flex',
      flexDirection: 'column'
    },
    btnGru: {
      marginTop: '1vh',
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'center'
    }
  })
)