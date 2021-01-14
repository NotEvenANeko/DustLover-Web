import React from 'react'
import { Button } from '@material-ui/core'
import { ArrowBackOutlined } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

import { useStyles } from './styles'

const BackButton = (props: LooseObj) => {

  const history = useHistory()
  const classes = useStyles()

  return (
    <Button 
      className={classes.root}
      variant="text"
      startIcon={<ArrowBackOutlined />}
      onClick={() => {history.goBack()}}
    >返回</Button>
  )
}

export default BackButton