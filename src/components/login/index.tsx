import React from 'react'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Button } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { useStyles } from './styles'
import { userLogin } from '@/redux/user/actions'

interface State {
    username: string,
    password: string
  }

const UserLogin = (props: LooseObj) => {

  const classes = useStyles()
  const dispatch = useDispatch()

  const { register, handleSubmit, errors } = useForm<State>()

  const [showPasswd, setValues] = React.useState(false)

  const onSubmit: SubmitHandler<State> = data => {
    dispatch(userLogin(data))
  }

  const handleClickShowPasswd = () => {
    setValues(!showPasswd)
  }

  const handleMouseDownShowPasswd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.loginForm}>
      <h2>登录账号</h2>
      <FormControl variant="outlined" error={Boolean(errors.username)} className={classes.loginInput}>
        <InputLabel htmlFor="login-username">Username</InputLabel>
        <OutlinedInput
          inputRef={register({
            required: 'Need Username',
            maxLength: { value: 20, message: 'Username too long' }
          })}
          id="login-username"
          name="account"
          labelWidth={70}
        />
      </FormControl>
      <FormControl variant="outlined" error={Boolean(errors.password)} className={classes.loginInput}>
        <InputLabel htmlFor="login-passwd">Password</InputLabel>
        <OutlinedInput
          id="login-passwd"
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
      <Button type="submit" color="primary" variant="contained">登录</Button>
      <p>还没有账号?<a onClick={() => {props.history.push('/register')}} style={{ color: '#50c0e0' }}>现在注册</a></p>
    </form>
  )

}

export default UserLogin