import React from 'react'
import { useSelector } from 'react-redux'

import { CustomState } from '@/redux/types'

const AdminHome = (props: LooseObj) => {
  const userInfo = useSelector((state: CustomState) => state.user)

  return (
    <>
      <h2>欢迎回来</h2>
      <h2>Login as {userInfo.username}</h2>
    </>
  )
}

export default AdminHome