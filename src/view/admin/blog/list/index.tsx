import React from 'react'
import { Button } from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'

import { ColumnsType, NekoTable } from '@/components/table'
import DeleteButton from '@/components/deleteBtn'
import Tags from '@/components/tag'

import axios from '@/utils/axios'

import useFetch from '@/hooks/useFetch'
import useBus from '@/hooks/useBus'

interface ArticleData {
  createdAt: string
  updatedAt: string
  id: number
  title: string
  content: string
  viewCnt: number
  tags: LooseObj[]
  categories: LooseObj[]
  comments: LooseObj[]
}

interface ArticleActionProps {
  id: number
  onEdit: (id: number) => () => void
  onDelete: (id: number) => () => void
}

const AdminArticleAddIcon = () => {
  const history = useHistory()

  const onClick = () => {
    history.push('/admin/article/add')
  }

  return (
    <Button onClick={onClick}>Add</Button>
  )
}

const AdminArticleAction = (props: ArticleActionProps) => {
  const { id, onEdit, onDelete } = props

  return (
    <>
      <Button onClick={onEdit(id)}>Edit</Button>
      <DeleteButton handleDelete={onDelete(id)} size="small" />
    </>
  )
}

const AdminArticleManager = (props: LooseObj) => {

  const location = useLocation()
  const history = useHistory()
  const bus = useBus()

  const handleArticleDelete = (id: number) => () => {
    axios.delete(`/article/${id}`)
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

  const handleArticleEdit = (id: number) => () => {
    history.push(`/admin/article/${id}`)
  }

  const {
    data,
    pagination,
    onFetch
  } = useFetch<ArticleData>({
    requestURL: '/article/list',
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

  const columns: ColumnsType = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: tags => <Tags tagList={tags} noDivider />
    }, {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
      render: categories => <Tags categoryList={categories} noDivider />
    }, {
      title: 'Actions',
      dataIndex: 'id',
      key: 'actions',
      render: id => <AdminArticleAction id={id} onDelete={handleArticleDelete} onEdit={handleArticleEdit} />
    }
  ]

  return (
    <NekoTable 
      title="Article"
      tools={<AdminArticleAddIcon />}
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

export default AdminArticleManager