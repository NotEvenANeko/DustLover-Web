import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap'
    },
    loadingIcon: {
      marginTop: '5vh',
      marginLeft: `calc(50vw - ${theme.spacing(7) + 1}px)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  })
)