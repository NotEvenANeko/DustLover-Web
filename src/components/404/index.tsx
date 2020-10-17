import React from 'react'
import { Button } from '@material-ui/core'

import { useStyles } from './styles'

const PageNotFound = (props: LooseObj) => {

  const classes = useStyles()

  return (
    <div className={classes.describeText}>
      <h2>404 Not Found</h2>
      <h3>欸不知道这个是什么呢……</h3>
      <Button variant='outlined' onClick={() => {window.history.back()}}>返回</Button>
    </div>
  )
}

export default PageNotFound