import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Button, Menu, Avatar, MenuItem, ButtonGroup } from '@material-ui/core'
import { AccountCircleOutlined } from '@material-ui/icons'

import { CustomState } from '@/redux/types'
import { userLogout } from '@/redux/user/actions'

const WebUserInfo = (props: LooseObj) => {

  const dispatch = useDispatch()
  const userInfo = useSelector((state: CustomState) => state.user)
  const { userId, userRole, username } = userInfo

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const jumpTo = (id: number) => {
    props.history.push(`/user/${id}`)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //if(username)
      setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    dispatch(userLogout())
  }

  const handleUserInfo = () => {
    handleClose()
    jumpTo(userId)
  }

  const handleLogin = () => {
    props.history.push('/login')
  }

  const handleRegister = () => {
    props.history.push('/register')
  }

  const handleAdmin = () => {
    handleClose()
    props.history.push('/admin')
  }

  return username ? (
    <>
      <Button onClick={handleClick}>
        <Avatar>
          <AccountCircleOutlined />
        </Avatar>
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
          <MenuItem onClick={handleUserInfo}>资料</MenuItem>
          {userRole < 1 && <MenuItem onClick={handleAdmin}>后台管理</MenuItem>}
          <MenuItem onClick={handleLogout}>登出</MenuItem>
      </Menu>
    </>) : (
      <>
        <ButtonGroup orientation="vertical" variant="text">
          <Button onClick={handleLogin}>登录</Button>
          <Button onClick={handleRegister}>注册</Button>
        </ButtonGroup>
      </>
    )

}

export default withRouter(WebUserInfo)

