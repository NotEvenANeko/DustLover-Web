import React from 'react'
import { IconButton, InputAdornment, Button, TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { useStyles } from './styles'
import { CustomState } from '@/redux/types'
import { userRegister, userLogin } from '@/redux/user/actions'
import useBus, { useListener } from '@/hooks/useBus'

interface State {
    username: string,
    password: string,
    rePassword: string,
    eMail: string
  }

const UserRegister = (props: LooseObj) => {

  const bus = useBus()
  const classes = useStyles()
  const dispatch = useDispatch()
  const userInfo = useSelector((state: CustomState) => state.user)
  const { username } = userInfo

  if(!!username) window.history.back()

  const { register, handleSubmit, errors, getValues } = useForm<State>()

  const [showPasswd, setValues] = React.useState(false)

  const onSubmit: SubmitHandler<State> = data => {
    dispatch(userRegister(data, bus))
  }

  useListener('registerSuccessForData', () => {
    dispatch(userLogin({
      account: getValues('username'),
      password: getValues('password')
      }, bus))
  })

  const handleClickShowPasswd = () => {
    setValues(!showPasswd)
  }

  const handleMouseDownShowPasswd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (!!username ? <></> : 
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.registerForm}>
      <h2>注册账号</h2>
      <TextField 
        variant="outlined"
        error={Boolean(errors.username)} 
        className={classes.registerInput}
        id="register-username"
        name="username"
        label="Username"
        inputRef={register({
          required: 'Need Username',
          maxLength: { value: 20, message: 'Username too long' }
        })}
        InputProps={{
          labelWidth: 70
        }}
        helperText={errors.username?.message}
      />
      <TextField 
        variant="outlined"
        error={Boolean(errors.eMail)} 
        className={classes.registerInput}
        id="register-email"
        name="eMail"
        label="E-Mail"
        inputRef={register({
          required: 'Need E-Mail',
          pattern: {
            value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/,
            message: 'Wrong E-Mail Format'
          }
        })}
        InputProps={{
          labelWidth: 70
        }}
        helperText={errors.eMail?.message}
      />
      <TextField 
        variant="outlined"
        error={Boolean(errors.password)} 
        className={classes.registerInput}
        id="register-passwd"
        label="Password"
        name="password"
        type={showPasswd ? 'text': 'password'}
        inputRef={register({
          required: 'Need Password',
          minLength: { value: 8, message: 'Password Can\'t Shorter Than 8 Characters' }
        })}
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
        helperText={errors.password?.message}
      />
      <TextField 
        variant="outlined"
        error={Boolean(errors.rePassword)} 
        className={classes.registerInput}
        id="register-repasswd"
        label="Repeat Password"
        name="repassword"
        type={showPasswd ? 'text': 'password'}
        inputRef={register({
          required: 'Please Repeat Your Password',
          validate: value => value === getValues('password') || 'Two Password Should Be Same'
        })}
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
        helperText={errors.rePassword?.message}
      />
      <Button type="submit" color="primary" variant="contained">注册</Button>
      <p>已有账号?<a onClick={() => {props.history.push('/login')}} style={{ color: '#50c0e0' }}>登录</a></p>
    </form>
  )

}

export default UserRegister