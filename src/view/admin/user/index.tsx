import React from 'react'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'

import { ColumnsType, NekoTable } from '@/components/table'
import DeleteButton from '@/components/deleteBtn'

import axios from '@/utils/axios'

import useFetch from '@/hooks/useFetch'
import useBus from '@/hooks/useBus'

interface UserData {
  uid: number
  username: string
  role: number|string
  createdAt: string
  eMail: string
}

const AdminUserManager = (props: LooseObj) => {

  const location = useLocation()
  const bus = useBus()

  const handleUserDelete = (uid: number) => () => {
    axios.delete(`/account/${uid}`)
         .then(() => {
            bus.emit('deleteSuccess')
            onFetch()
         })
         .catch(err => {
           if(err !== 'Err') {
            bus.emit('deleteSuccess')
            onFetch()
          }
         })
  }

  const {
    data,
    pagination,
    onFetch
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

  const columns: ColumnsType = [
    {
      title: 'UID',
      dataIndex: 'uid',
      key: 'uid',
    }, {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: 'User Role',
      dataIndex: 'role',
      key: 'role',
      render: role => role <= 1 ? 'Admin' : 'Guest'
    }, {
      title: 'User E-Mail',
      dataIndex: 'eMail',
      key: 'email'
    }, {
      title: 'User Registered Time',
      dataIndex: 'createdAt',
      key: 'register-time',
      render: createdAt => dayjs(createdAt).format('YYYY.MM.DD')
    }, {
      title: 'Actions',
      dataIndex: 'uid',
      key: 'actions',
      render: uid => <DeleteButton handleDelete={handleUserDelete(uid)} size="small" />
    }
  ]
  
  const handlePageChange = (event: unknown, page: number) => {
    pagination.onChange(page)
  }

  return (
    <NekoTable
      dataSource={data}
      title="User"
      columns={columns}
      pagination={{
        page: pagination.current,
        onChangePage: handlePageChange,
        rowsPerPage: pagination.pageSize,
        count: pagination.total,
        hideOnSinglePage: true,
      }}
    />
  )

}

export default AdminUserManager