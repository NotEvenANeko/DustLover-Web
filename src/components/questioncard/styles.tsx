import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      width: `calc(30vw - ${theme.spacing(3)}px)`,
      height: '25vh',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      backgroundColor: '#ffffff',
      transition: 'background-color 0.5s',
      '&:hover': {
        backgroundColor: '#e1e1e1',
        cursor: 'pointer'
      }
    },
    content: {
      flexGrow: 1,
      padding: '2vh'
    },
    statusArea: {
      height: '5vh',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    statusIconBanner: {
      marginTop: `calc(-5vh - ${theme.spacing(1)}px)`,
      marginRight: -theme.spacing(1),
      width: 0,
      height: 0
    },
    timeStatus: {
      fontSize: '0.8rem',

    },
    statusIconTrue: {
      borderBottom: `calc(10vh + ${theme.spacing(2)}px) solid #21bf46`,
      borderLeft: `calc(10vh + ${theme.spacing(2)}px) solid transparent`
    },
    statusIconFalse: {
      borderBottom: `calc(10vh + ${theme.spacing(2)}px) solid #1bcdfa`,
      borderLeft: `calc(10vh + ${theme.spacing(2)}px) solid transparent`
    },
    statusIcon: {
      position: 'relative',
      color: '#2d2d2d',
      width: '5vmin',
      height: '5vmin',
      top: `calc(5vmin + ${theme.spacing(1)}px)`,
      right: `calc(5vmin + ${theme.spacing(1)}px)`
    }
  })
)