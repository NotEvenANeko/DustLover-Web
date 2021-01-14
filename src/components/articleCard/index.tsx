import React from 'react'
import { Paper, Divider } from '@material-ui/core'

import { compileMarkdown } from '@/utils'

interface ArticleCardProps {
  title: string,
  content: string,
  time: string,
  id: number,
  viewCnt: number,
  commentCnt: number,
  [prop: string]: any
}

const ArticleCard = (props: ArticleCardProps) => {

  return (
    <Paper variant="outlined">
      <h2>{props.title}</h2>
      <Divider variant="middle" />
      <div dangerouslySetInnerHTML={{ __html: compileMarkdown(props.content) }} />
    </Paper>
  )
}

export default ArticleCard