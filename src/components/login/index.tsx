import React from 'react'
import { IconButton, InputAdornment, Button, TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { useStyles } from './styles'
import { CustomState } from '@/redux/types'
import { userLogin } from '@/redux/user/actions'
import useBus from '@/hooks/useBus'

interface State {
    username: string,
    password: string
  }

const UserLogin = (props: LooseObj) => {

  const bus = useBus()
  const classes = useStyles()
  const dispatch = useDispatch()
  const userInfo = useSelector((state: CustomState) => state.user)
  const { username } = userInfo

  if(!!username) window.history.back()

  const { register, handleSubmit, errors } = useForm<State>()

  const [showPasswd, setValues] = React.useState(false)

  const onSubmit: SubmitHandler<State> = data => {
    dispatch(userLogin(data, bus))
  }

  const handleClickShowPasswd = () => {
    setValues(!showPasswd)
  }

  const handleMouseDownShowPasswd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (!!username ? <></> : 
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.loginForm}>
      <h2>登录账号</h2>
      <TextField 
        variant="outlined"
        error={Boolean(errors.username)}
        className={classes.loginInput}
        label="Username"
        inputRef={register({
            required: 'Need Username',
            maxLength: { value: 20, message: 'Username too long' }
          })}
        id="login-username"
        name="account"
        helperText={errors.username?.message}
        InputProps={{
          labelWidth: 70
        }}
      />
      <TextField 
        variant="outlined"
        error={Boolean(errors.password)}
        className={classes.loginInput}
        label="Password"
        inputRef={register({
          required: 'Need Password',
          minLength: { value: 8, message: 'Password Can\'t Shorter Than 8 Characters' }
        })}
        id="login-passwd"
        name="password"
        type={showPasswd ? "text" : "password"}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPasswd}
                            onMouseDown={handleMouseDownShowPasswd}
                            edge="end"
                          >
                            {showPasswd ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>,
          labelWidth: 70
        }}
      />
      <Button type="submit" color="primary" variant="contained">登录</Button>
      <p>还没有账号?<a onClick={() => {props.history.push('/register')}} className={classes.superLink}>现在注册</a></p>
    </form>
  )

}

export default UserLogin