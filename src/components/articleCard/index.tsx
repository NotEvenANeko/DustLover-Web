import React from 'react'
import { Paper, Divider } from '@material-ui/core'
import { ChatOutlined, VisibilityOutlined } from '@material-ui/icons'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'

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

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      padding: theme.spacing(2),
      paddingTop: 0,
      marginBottom: theme.spacing(1),
      backgroundColor: '#ffffff',
      transition: 'background-color 0.5s',
      '&:hover': {
        backgroundColor: '#e1e1e1',
        cursor: 'pointer'
      }
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    },
    time: {
      fontSize: theme.spacing(1.75)
    },
    status: {
      display: 'flex'
    },
    placeholder: {
      flexGrow: 1
    },
    count: {
      paddingLeft: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      marginRight: theme.spacing(0.5),
      fontSize: '1rem'
    }
  })  
)

const ArticleCard = (props: ArticleCardProps) => {

  const classes = useStyles()
  const history = useHistory()

  return (
    <Paper variant="outlined" className={classes.root} onClick={() => {history.push(`/article/${props.id}`)}}>
      <div className={classes.header}>
        <h2>{props.title}</h2>
        <p className={classes.time}>{dayjs(props.time).format('YYYY.MM.DD')}</p>
      </div>
      <Divider variant="middle" />
      <div dangerouslySetInnerHTML={{ __html: compileMarkdown(props.content) }} />
      <div className={classes.status}>
        <div className={classes.placeholder} />
        <div className={classes.count}><VisibilityOutlined className={classes.icon} />{props.viewCnt}</div>
        <div className={classes.count}><ChatOutlined className={classes.icon} />{props.commentCnt}</div>
      </div>
    </Paper> 
  )
}

export default ArticleCard