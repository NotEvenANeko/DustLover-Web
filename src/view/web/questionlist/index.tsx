import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { useInView } from 'react-intersection-observer'
import { ExpandMoreOutlined } from '@material-ui/icons'

import QuestionCard from '@/components/questioncard'

import useFetch from '@/hooks/useFetch'

import { useStyles } from './styles'
import { usePublicStyles } from '@/publicStyles'

const Question = (props: LooseObj) => {

  const [loadToEnd, setLoadToEnd] = React.useState(false)

  const classes = useStyles()
  const publicClasses = usePublicStyles()

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
    const res = handleLoadMore()
    if(!loadToEnd) setLoadToEnd(!res)
  }, [inView])

  return (
    <>
      <div className={classes.root}>
        {loading.primaryLoading ? 
          <div className={`${publicClasses.loadingIcon} ${publicClasses.loadingIconTop}`}>
            <CircularProgress />
            <p>Loading...</p>
          </div>
        : data.length > 0 && data.map((item, index: number) => {
          return <QuestionCard key={index} id={item.id} content={item.content} time={item.createdAt.split(' ')[0]} status={item.answer !== null} />
        })}
      </div>
      <div ref={ref} className={classes.scrollDownArea}>
        {loadToEnd ? <p>没有更多了呢</p> :
          (!inView ? 
            <div className={publicClasses.loadingIcon}>
              <p>下滑展示更多</p>
              <ExpandMoreOutlined />
            </div> :
            <div className={publicClasses.loadingIcon}>
              <CircularProgress />
              <p>Loading...</p>
            </div>)
        }
      </div>
    </>
  )
}

export default Question