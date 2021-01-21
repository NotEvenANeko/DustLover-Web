import React from 'react'
import { useInView } from 'react-intersection-observer'
import { ExpandMoreOutlined } from '@material-ui/icons'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import useFetch from '@/hooks/useFetch'

import LoadingIcon from '@/components/loadingIcon'
import ArticleCard from '@/components/articleCard'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    scrollDownArea: {
      display: 'flex',
      height: '15vh',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
)

const BlogMain = (props: LooseObj) => {

  const [loadToEnd, setLoadToEnd] = React.useState(false)

  const classes = useStyles()

  const {
    data,
    loading,
    handleLoadMore
  } = useFetch({
    requestURL: '/article/list',
    deltaUpd: true,
    loadStep: 10
  })

  const [ref, inView] = useInView({
    threshold: 1
  })

  React.useEffect(() => {
    if(!inView) return
    if(loading.primaryLoading) return
    const res = handleLoadMore()
    if(!loadToEnd) setLoadToEnd(!res)
  }, [inView])

  return (
    <>
      <div>
        {loading.primaryLoading ? 
          <LoadingIcon position="top" />
        : data.length > 0 && data.map((item, index: number) => {
          return <ArticleCard 
                  key={index} 
                  id={item.id} 
                  title={item.title} 
                  content={item.content} 
                  time={item.createdAt.split(' ')[0]}
                  commentCnt={item.commentCnt}
                  viewCnt={item.viewCnt}
                />
        })}
      </div>
      <div ref={ref} className={classes.scrollDownArea}>
        {loadToEnd ? <p>没有更多了呢</p> :
          (!inView ? 
            <LoadingIcon nested={
              <>
                <p>下滑展示更多</p>
                <ExpandMoreOutlined />
              </>
            } /> :
            <LoadingIcon />)
        }
      </div>
    </>
  )
}

export default BlogMain