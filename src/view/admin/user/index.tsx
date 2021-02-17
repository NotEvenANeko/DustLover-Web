import React from 'react'
import { useLocation } from 'react-router-dom'

import EnhancedTable from '@/components/table'

import useFetch from '@/hooks/useFetch'

interface UserData {
  uid: number
  username: string
  role: number|string
  createdAt: string
  eMail: string
}

const AdminUserManager = (props: LooseObj) => {

  const location = useLocation()

  const {
    data,
    pagination,
    count
  } = useFetch<UserData>({
    requestURL: '/account/user',
    queryParams: { pageSize: 10 },
    fetchDependence: [location.search]
  }, {
    on: true,
    current: 0,
    pageSize: 10,
    total: 0
  })

  const handlePageChange = (event: unknown, page: number) => {
    pagination.onChange(page)
  }

  return (
    <EnhancedTable<UserData>
      rows={data.map(item => ({ ...item, role: item.role <= 1 ? 'Admin' : 'Guest' }))}
      defaultOrderBy="uid"
      selectedBy="uid"
      labels={['username', 'role', 'eMail', 'createdAt']}
      headCells={[
        { id: 'uid', disablePadding: true, label: 'User ID', numeric: true },
        { id: 'username', disablePadding: false, label: 'User Name', numeric: false },
        { id: 'role', disablePadding: false, label: 'User Role', numeric: false },
        { id: 'eMail', disablePadding: false, label: 'User E-Mail Address', numeric: false },
        { id: 'createdAt', disablePadding: false, label: 'User Registered Time', numeric: false },
      ]}
      pagination={{
        rowsPerPage: pagination.pageSize,
        page: pagination.current,
        count: count,
        onChange: handlePageChange
      }}
    />
  )

}

export default AdminUserManager