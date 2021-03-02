import React from 'react'
import { Paper, Divider } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { CreateOutlined, VisibilityOutlined } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

import BackButton from '@/components/backBtn'
import ArticleTags from '@/components/tag'
import Discuss from '@/components/discuss'

import useBus from '@/hooks/useBus'

import { CustomState } from '@/redux/types'

import { compileMarkdown } from '@/utils'
import axios from '@/utils/axios'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1)
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    status: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: -theme.spacing(3)
    },
    icon: {
      fontSize: '1rem',
      marginRight: theme.spacing(0.5)
    }
  })
)

interface ArticleState {
  createdAt: string,
  updatedAt: string,
  title: string,
  content: string,
  viewCnt: number,
  tags: LooseObj[],
  categories: LooseObj[],
  comments: LooseObj[]
}

const ArticlePage = (props: LooseObj) => {

  const { id } = props.match.params

  const classes = useStyles()
  const userInfo = useSelector((state: CustomState) => state.user)
  const bus = useBus()
  const [article, setArticle] = React.useState<ArticleState>({
    createdAt: '',
    updatedAt: '',
    title: '',
    content: '',
    viewCnt: 0,
    tags: [],
    categories: [],
    comments: []
  })

  React.useEffect(() => {
    const fetchData = (id: any) => {
      axios.get<ArticleState>(`/article/${id}`)
           .then(res => {
             //console.log(res)
             setArticle(res.data)
           })
           .catch(() => {
             bus.emit('unknownError')
           })
    }
    fetchData(id)
  }, [id])

  const setCommentList = (list: LooseObj[]) => {
    setArticle({ ...article, comments: list })
  }

  React.useEffect(() => {
    if((window as any).MathJax && (window as any).MathJax.typeset)
      (window as any).MathJax.typeset()
  })
  
  return (
    <div>
      <BackButton />
      <Paper variant="outlined" className={classes.root}>
        <div className={classes.header}>
          <h1>{article.title}</h1>
          <div className={classes.status}>
            <p style={{ fontSize: '1rem' }}>
              <CreateOutlined className={classes.icon} />
              {`Posted on ${dayjs(article.createdAt).format('YYYY.MM.DD HH:mm')}`}
            </p>
            <ArticleTags tagList={article.tags} categoryList={article.categories} noDivider />
            <VisibilityOutlined className={classes.icon} />
            <p>{article.viewCnt}</p>
          </div>
        </div>
        <Divider variant="middle" />
        <div>
          <div dangerouslySetInnerHTML={{ __html: compileMarkdown(article.content) }} />
        </div>
        <Discuss articleId={id} commentList={article.comments} setCommentList={setCommentList} />
      </Paper>
    </div>
  )
}

export default ArticlePage