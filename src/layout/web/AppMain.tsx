import React from 'react'
import { useStyles } from './styles'

const AppMain = (props: LooseObj) => {
  const classes = useStyles()
  return <div className={classes.webContent}>{props.children}</div>
}

export default AppMain