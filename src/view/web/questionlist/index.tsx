import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { useInView } from 'react-intersection-observer'
import { ExpandMoreOutlined } from '@material-ui/icons'

import QuestionCard from '@/components/questioncard'

import useFetch from '@/hooks/useFetch'

import { useStyles } from './styles'

interface QuestionItem {
  answer: LooseObj | null,
  content: string,
  createdAt: string,
  id: number
}

const Question = (props: LooseObj) => {

  const [loadToEnd, setLoadToEnd] = React.useState(false)

  const classes = useStyles()

  const {
    data,
    loading,
    handleLoadMore
  } = useFetch({
    requestURL: '/question',
    deltaUpd: true,
    loadStep: 12
  })
  
  const [ref, inView] = useInView({
    threshold: 1
  })
  
  React.useEffect(() => {
    if(!inView) return
    if(loading.primaryLoading) return
    console.log(loadToEnd)
    const res = handleLoadMore()
    console.log(res)
    if(!loadToEnd) setLoadToEnd(!res)
  }, [inView])

  return (
    <>
      <div className={classes.root}>
        {loading.primaryLoading ? 
          <div className={`${classes.loadingIcon} ${classes.loadingIconTop}`}>
            <CircularProgress />
            <p>Loading...</p>
          </div>
        : data.length > 0 && data.map((item: QuestionItem, index: number) => {
          return <QuestionCard key={index} id={item.id} content={item.content} time={item.createdAt.split(' ')[0]} status={item.answer !== null} />
        })}
      </div>
      <div ref={ref} className={classes.scrollDownArea}>
        {loadToEnd ? <p>没有更多了呢</p> :
          (!inView ? 
            <div className={classes.loadingIcon}>
              <p>下滑展示更多</p>
              <ExpandMoreOutlined />
            </div> :
            <div className={classes.loadingIcon}>
              <CircularProgress />
              <p>Loading...</p>
            </div>)
        }
      </div>
    </>
  )
}

export default Question