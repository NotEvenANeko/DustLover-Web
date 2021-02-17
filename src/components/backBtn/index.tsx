import React from 'react'
import { Button } from '@material-ui/core'
import { ArrowBackOutlined } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

import { useStyles } from './styles'

interface BackButtonProps {
  onBack?: string,
  noLabel?: boolean
  [prop: string]: any,
}

const BackButton = (props: BackButtonProps) => {

  const history = useHistory()
  const classes = useStyles()

  return (
    <Button 
      className={classes.root}
      variant="text"
      startIcon={<ArrowBackOutlined />}
      onClick={() => {props.onBack ? history.push(props.onBack) : history.goBack()}}
    >{props.noLabel ? '' : '返回'}</Button>
  )
}

export default BackButton