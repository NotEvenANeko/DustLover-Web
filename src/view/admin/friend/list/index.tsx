import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Button, Avatar } from '@material-ui/core'
import { LinkOutlined } from '@material-ui/icons'

import { NekoTable, ColumnsType } from '@/components/table'
import DeleteButton from '@/components/deleteBtn'

import axios from '@/utils/axios'

import useFetch from '@/hooks/useFetch'
import useBus from '@/hooks/useBus'

interface FriendLinkData {
  id: number
  title: string
  link: string
  avatarLink: string
  describe: string
  createdAt: string
  updatedAt: string
}

interface FriendLinkActionProps {
  id: number
  onEdit: (id: number) => () => void
  onDelete: (id: number) => () => void
}

const AdminFriendLinkAddIcon = () => {
  const history = useHistory()

  const onClick = () => {
    history.push('/admin/friend/add')
  }

  return (
    <Button onClick={onClick}>Add</Button>
  )
}

const AdminFriendLinkAction = (props: FriendLinkActionProps) => {
  const { id, onEdit, onDelete } = props

  return (
    <>
      <Button onClick={onEdit(id)}>Edit</Button>
      <DeleteButton handleDelete={onDelete(id)} size="small" />
    </>
  )
}

const AdminFriendLinkManager = (props: LooseObj) => {
  const location = useLocation()
  const history = useHistory()
  const bus = useBus()

  const {
    data,
    pagination,
    onFetch
  } = useFetch<FriendLinkData>({
    requestURL: '/friend',
    queryParams: { pageSize: 10 },
    fetchDependence: [location.search]
  }, {
    on: true,
    pageSize: 10,
    current: 0,
    total: 0,
  })

  const handleFriendLinkEdit = (id: number) => () => {
    history.push(`/admin/friend/${id}`)
  }

  const handleFriendLinkDelete = (id: number) => () => {
    axios.delete(`/friend/${id}`)
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

  const handlePageChange = (event: unknown, page: number) => {
    pagination.onChange(page)
  }

  const columns: ColumnsType = [
    {
      title: 'Avatar',
      dataIndex: 'avatarLink',
      key: 'friendlink-avatar',
      render: avatarLink => <Avatar src={avatarLink || ''}><LinkOutlined /></Avatar>
    }, {
      title: 'Title',
      dataIndex: 'title',
      key: 'friendlink-title',
    }, {
      title: 'Link',
      dataIndex: 'link',
      key: 'friendlink-link',
    }, {
      title: 'Describe',
      dataIndex: 'describe',
      key: 'friendlink-describe',
    }, {
      title: 'Actions',
      dataIndex: 'id',
      key: 'friendlink-actions',
      render: id => <AdminFriendLinkAction id={id} onDelete={handleFriendLinkDelete} onEdit={handleFriendLinkEdit} />
    }
  ]

  return (
    <NekoTable 
      title="Friend Link"
      tools={<AdminFriendLinkAddIcon />}
      dataSource={data}
      columns={columns}
      pagination={{
        page: pagination.current,
        onChangePage: handlePageChange,
        count: pagination.total,
        rowsPerPage: pagination.pageSize,
        hideOnSinglePage: true
      }}
    />
  )
}

export default AdminFriendLinkManager