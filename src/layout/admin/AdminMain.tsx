import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    webContent: {
      marginLeft: theme.spacing(7) + 1,
      padding: theme.spacing(1)
    }
  }))

const AdminMain = (props: LooseObj) => {
  const classes = useStyles()

  return <div className={classes.webContent}>{props.children}</div>
}

export default AdminMain