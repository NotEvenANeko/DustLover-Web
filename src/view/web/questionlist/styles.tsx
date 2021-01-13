import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr'
    },
    loadingIcon: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    loadingIconTop: {
      marginTop: '5vh',
      marginLeft: `calc(50vw - ${theme.spacing(7) + 1}px)`
    },
    scrollDownArea: {
      display: 'flex',
      height: '15vh',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
)