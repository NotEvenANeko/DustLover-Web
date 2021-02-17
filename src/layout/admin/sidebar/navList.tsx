import React from 'react'
import { HomeOutlined,
         LinkOutlined,
         PersonOutlineOutlined,
         DescriptionOutlined } from '@material-ui/icons'

export default [
  {
    icon: <HomeOutlined />,
    text: '主页',
    to: '/admin'
  }, {
    icon: <PersonOutlineOutlined />,
    text: '用户管理',
    to: '/admin/user'
  }, {
    icon: <DescriptionOutlined />,
    text: '博客管理',
    to: '/admin/blog'
  }, {
    icon: <LinkOutlined />,
    text: '友链管理',
    to: '/admin/friend'
  }
]