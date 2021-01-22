import React from 'react'
import { Paper, Divider } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { CreateOutlined, VisibilityOutlined } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

import BackButton from '@/components/backBtn'
import LoadingIcon from '@/components/loadingIcon'
import ArticleTags from '@/components/tag'

import useFetch from '@/hooks/useFetch'
import useBus from '@/hooks/useBus'

import { CustomState } from '@/redux/types'
import { compileMarkdown } from '@/utils'

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

const ArticlePage = (props: LooseObj) => {

  const { id } = props.match.params

  const classes = useStyles()
  const userInfo = useSelector((state: CustomState) => state.user)
  const bus = useBus()

  const { 
    data,
    loading,
    onFetch
  } = useFetch({
    requestURL: `/article/${id}`,
    bus
  })

  return (
    <div>
      <BackButton />
      {loading.primaryLoading ?
        <LoadingIcon position="top" /> :
        <Paper variant="outlined" className={classes.root}>
          <div className={classes.header}>
            <h1>{data[0].title}</h1>
            <div className={classes.status}>
              <p style={{ fontSize: '1rem' }}>
                <CreateOutlined className={classes.icon} />
                {`Posted on ${dayjs(data[0].createdAt).format('YYYY.MM.DD H:m')}`}
              </p>
              <ArticleTags tagList={data[0].tags} categoryList={data[0].categories} noDivider />
              <VisibilityOutlined className={classes.icon} />
              <p>{data[0].viewCnt}</p>
            </div>
          </div>
          <Divider variant="middle" />
          <div>
            <div dangerouslySetInnerHTML={{ __html: compileMarkdown(data[0].content) }} />
          </div>
        </Paper>
      }
    </div>
  )
}

export default ArticlePage