import React from 'react'
import { Button } from '@material-ui/core'

import { useStyles } from './styles'

interface CustomFormProps {
  onCancel: () => void,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  children: JSX.Element,
  noCancel?: boolean,
  noSubmit?: boolean,
  submitText?: string,
  cancelText?: string,
  size?: 'large'|'medium'|'small',
  [prop: string]: any
}

const CustomForm = (props: CustomFormProps) => {

  const classes = useStyles()

  return (
    <form noValidate autoComplete="off" className={classes.formRoot} onSubmit={props.onSubmit}>
      {props.children}
      <div className={classes.btnGru}>
        {!props.noCancel && <Button size={props.size} color="default" onClick={props.onCancel}>{props.cancelText || '取消'}</Button>}
        {!props.noSubmit && <Button size={props.size} type="submit" color="primary" variant="contained">{props.submitText || '提交'}</Button>}
      </div>
    </form>
  )
}

export default CustomForm