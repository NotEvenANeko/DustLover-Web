import React from 'react'
import { useInView } from 'react-intersection-observer'
import { ExpandMoreOutlined } from '@material-ui/icons'

import QuestionCard from '@/components/questionCard'
import LoadingIcon from '@/components/loadingIcon'

import useFetch from '@/hooks/useFetch'

import { useStyles } from './styles'


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
    const res = handleLoadMore()
    if(!loadToEnd) setLoadToEnd(!res)
  }, [inView])

  return (
    <>
      <div className={classes.root}>
        {loading.primaryLoading ? 
          <LoadingIcon position="top" />
        : data.length > 0 && data.map((item, index: number) => {
          return <QuestionCard key={index} id={item.id} content={item.content} time={item.createdAt.split(' ')[0]} status={item.answer !== null} />
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

export default Question