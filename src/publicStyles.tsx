import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const usePublicStyles = makeStyles((theme: Theme) => 
  createStyles({
    loadingIcon: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    loadingIconTop: {
      marginTop: '5vh',
      marginLeft: `calc(50vw - ${theme.spacing(7) + 1}px)`
    },
  })
)