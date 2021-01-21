import React from 'react'
import { HelpOutlined,
         HomeOutlined,
         InfoOutlined,
         LinkOutlined,
         DescriptionOutlined } from '@material-ui/icons'

export default [
  {
    icon: <HomeOutlined />,
    text: '主页',
    to: '/'
  }, {
    icon: <InfoOutlined />,
    text: '关于猫猫',
    to: '/about'
  }, {
    icon: <HelpOutlined />,
    text: '提问箱',
    to: '/question'
  }, {
    icon: <DescriptionOutlined />,
    text: '博客',
    to: '/blog'
  }, {
    icon: <LinkOutlined />,
    text: '友情链接',
    to: '/friend'
  }
]