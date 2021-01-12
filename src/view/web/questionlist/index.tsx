import React from 'react'
import { CircularProgress } from '@material-ui/core'

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

  const classes = useStyles()

  const {
    data,
    loading,
    onFetch,
    pagination
  } = useFetch({
    requestURL: '/question',
    withLoading: true,
    withPagination: true
  })

  console.log(loading)

  return (
    <div className={classes.root}>
      {!!loading ? 
        <div className={classes.loadingIcon}>
          <CircularProgress />
          <p>Loading...</p>
        </div>
      : data.length > 0 && data.map((item: QuestionItem, index: number) => {
        return <QuestionCard key={index} id={item.id} content={item.content} time={item.createdAt.split(' ')[0]} status={item.answer !== null} />
      })}
    </div>
  )
}

export default Question