import React from 'react'
import { CircularProgress } from '@material-ui/core'

import { useStyles } from './styles'

interface LoadingIconProps {
  position?: 'top',
  nested?: JSX.Element,
  [prop: string]: any
}

const LoadingIcon = (props: LoadingIconProps) => {

  const classes = useStyles()

  return (
    <div className={`${classes.loadingIcon} ${!!props.position && classes.loadingIconTop}`}>
      {!props.nested ? 
        <>
          <CircularProgress />
          <p>Loading...</p>
        </> : props.nested}
    </div>
  )
}

export default LoadingIcon