import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr'
    },
    scrollDownArea: {
      display: 'flex',
      height: '15vh',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    questionAdd: {
      position: 'absolute',
      top: '90vh',
      left: '94vw'
    }
  })
)