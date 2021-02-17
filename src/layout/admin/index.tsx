import React from 'react'

import AdminSideBar from './sidebar'
import AdminMain from './AdminMain'

const AdminLayout = (props: LooseObj) => {
  return (
    <>
      <AdminSideBar />
      <AdminMain {...props} />
    </>
  )
}

export default AdminLayout