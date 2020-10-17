import React from 'react'
import { HelpOutlined,
         HomeOutlined,
         InfoOutlined,
         BuildOutlined,
         DescriptionOutlined } from '@material-ui/icons'

export default [
  {
    icon: <HomeOutlined />,
    text: '主页',
    to: '/'
  }, {
    icon: <InfoOutlined />,
    text: '关于DustLover',
    to: '/about'
  }, {
    icon: <HelpOutlined />,
    text: '提问箱',
    to: '/question'
  }, {
    icon: <BuildOutlined />,
    text: '工具',
    to: '/utils'
  }, {
    icon: <DescriptionOutlined />,
    text: '博客',
    to: '/article'
  }
]