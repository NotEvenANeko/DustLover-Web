import React from 'react'
import { Button } from '@material-ui/core'

import { useStyles } from './styles'

interface CustomFormProps {
  onCancel: () => void,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  children: JSX.Element
  [prop: string]: any
}

const CustomForm = (props: CustomFormProps) => {

  const classes = useStyles()

  return (
    <form noValidate autoComplete="off" className={classes.formRoot} onSubmit={props.onSubmit}>
      {props.children}
      <div className={classes.btnGru}>
        <Button color="default" onClick={props.onCancel}>取消</Button>
        <Button type="submit" color="primary" variant="contained">提交</Button>
      </div>
    </form>
  )
}

export default CustomForm