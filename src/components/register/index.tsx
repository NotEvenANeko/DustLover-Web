import React from 'react'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Button } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { useStyles } from './styles'
import { userRegister, userLogin } from '@/redux/user/actions'

interface State {
    username: string,
    password: string,
    rePassword: string,
    eMail: string
  }

const UserRegister = (props: LooseObj) => {

  const classes = useStyles()
  const dispatch = useDispatch()

  const { register, handleSubmit, errors, getValues } = useForm<State>()

  const [showPasswd, setValues] = React.useState(false)

  const onSubmit: SubmitHandler<State> = data => {
    dispatch(userRegister(data))
    dispatch(userLogin({
      account: data.username,
      password: data.password
    }))
  }

  const handleClickShowPasswd = () => {
    setValues(!showPasswd)
  }

  const handleMouseDownShowPasswd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.registerForm}>
      <h2>注册账号</h2>
      <div className={classes.registerInput}>
      <FormControl variant="outlined" error={Boolean(errors.username)}>
        <InputLabel htmlFor="register-username">Username</InputLabel>
        <OutlinedInput
          inputRef={register({
            required: 'Need Username',
            maxLength: { value: 20, message: 'Username too long' }
          })}
          id="register-username"
          name="account"
          labelWidth={70}
        />
      </FormControl>
      </div>
      <div className={classes.registerInput}>
      <FormControl variant="outlined" error={Boolean(errors.eMail)} className={classes.registerInput}>
        <InputLabel htmlFor="register-email">E-Mail</InputLabel>
        <OutlinedInput
          id="register-email"
          name="eMail"
          inputRef={register({
            required: 'Need E-Mail',
            pattern: {
              value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/,
              message: 'Wrong E-Mail'
            }
          })}
          labelWidth={70}
        />
      </FormControl>
      </div>
      <div className={classes.registerInput}>
      <FormControl variant="outlined" error={Boolean(errors.password)} className={classes.registerInput}>
        <InputLabel htmlFor="register-passwd">Password</InputLabel>
        <OutlinedInput
          id="register-passwd"
          name="password"
          type={showPasswd ? "text" : "password"}
          inputRef={register({
            required: 'Need Password'
          })}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPasswd}
                onMouseDown={handleMouseDownShowPasswd}
                edge="end"
              >
                {showPasswd ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
      </div>
      <div className={classes.registerInput}>
      <FormControl variant="outlined" error={Boolean(errors.rePassword)} className={classes.registerInput}>
        <InputLabel htmlFor="register-repasswd">Repeat Password</InputLabel>
        <OutlinedInput
          id="register-repasswd"
          name="repassword"
          type={showPasswd ? "text" : "password"}
          inputRef={register({
            required: 'Please Repeat Your Password',
            validate: value => value === getValues('password') || 'Two Password Should Be Same'
          })}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPasswd}
                onMouseDown={handleMouseDownShowPasswd}
                edge="end"
              >
                {showPasswd ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
      </div>
      <Button type="submit" color="primary" variant="contained">注册</Button>
      <p>已有账号?<a onClick={() => {props.history.push('/login')}} style={{ color: '#50c0e0' }}>登录</a></p>
    </form>
  )

}

export default UserRegister