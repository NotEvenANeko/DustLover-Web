import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { useHistory } from 'react-router-dom'

import useBus, { useListener } from '@/hooks/useBus'

interface SnackBarState {
  registerSuccess: boolean,
  registerFailed: boolean,
  loginFailed: boolean,
  loginSuccess: boolean,
  logoutSuccess: boolean,
  unknownError: boolean
}

const Alert = (props: AlertProps) => <MuiAlert elevation={0} variant="filled" {...props} />

const SnackBarCustom = (props: LooseObj) => {

  const bus = useBus()
  const history = useHistory()

  const [open, setOpen] = React.useState<SnackBarState>({
    loginFailed: false,
    loginSuccess: false,
    registerFailed: false,
    registerSuccess: false,
    logoutSuccess: false,
    unknownError: false
  })

  const setToDefault = () => {
    setOpen({
      loginFailed: false,
      loginSuccess: false,
      registerFailed: false,
      registerSuccess: false,
      logoutSuccess: false,
      unknownError: false
    })
  }

  useListener('loginSuccess', () => {
    setToDefault()
    setOpen({
      ...open,
      loginSuccess: true
    })
    history.push('/')
  })

  useListener('loginFailed', () => {
    setToDefault()
    setOpen({
      ...open,
      loginFailed: true
    })
  })

  useListener('registerSuccess', () => {
    setToDefault()
    setOpen({
      ...open,
      registerSuccess: true
    })
    bus.emit('registerSuccessForData')
    history.push('/')
  })

  useListener('registerFailed', () => {
    setToDefault()
    setOpen({
      ...open,
      registerFailed: true
    })
  })

  useListener('logoutSuccess', () => {
    setToDefault()
    setOpen({
      ...open,
      logoutSuccess: true
    })
  })

  const handleSnackBarClose = (prop: keyof SnackBarState) => (event?: React.SyntheticEvent, reason?: string) => {
    if(reason === 'clickaway') return
    setOpen({
      ...open,
      [prop]: !open[prop]
    })
  }

  return (
    <>
      <Snackbar open={open.loginSuccess} autoHideDuration={5000} onClose={handleSnackBarClose('loginSuccess')}>
        <Alert onClose={handleSnackBarClose('loginSuccess')} severity="success">
          登录成功
        </Alert>
      </Snackbar>
      <Snackbar open={open.loginFailed} autoHideDuration={5000} onClose={handleSnackBarClose('loginFailed')}>
        <Alert onClose={handleSnackBarClose('loginFailed')} severity="error">
          登录失败
        </Alert>
      </Snackbar>
      <Snackbar open={open.registerSuccess} autoHideDuration={5000} onClose={handleSnackBarClose('registerSuccess')}>
        <Alert onClose={handleSnackBarClose('registerSuccess')} severity="success">
          注册成功,正在登录并重定向至主页
        </Alert>
      </Snackbar>
      <Snackbar open={open.registerFailed} autoHideDuration={5000} onClose={handleSnackBarClose('registerFailed')}>
        <Alert onClose={handleSnackBarClose('registerFailed')} severity="error">
          注册失败
        </Alert>
      </Snackbar>
      <Snackbar open={open.logoutSuccess} autoHideDuration={5000} onClose={handleSnackBarClose('logoutSuccess')}>
        <Alert onClose={handleSnackBarClose('logoutSuccess')} severity="success">
          登出成功
        </Alert>
      </Snackbar>
      <Snackbar open={open.unknownError} autoHideDuration={5000} onClose={handleSnackBarClose('unknownError')}>
        <Alert onClose={handleSnackBarClose('unknownError')} severity="error">
          Unknown Error
        </Alert>
      </Snackbar>
    </>
  )
}

export default SnackBarCustom