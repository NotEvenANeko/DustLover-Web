import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({

  }))

const AdminMain = (props: LooseObj) => {
  const classes = useStyles()

  return <div>{props.children}</div>
}

export default AdminMain