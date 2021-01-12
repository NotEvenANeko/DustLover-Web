import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      //justifyContent: 'space-around',
      flexWrap: 'wrap'
    }
  })
)