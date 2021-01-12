import React from 'react'
import {} from '@material-ui/core'

import QuestionCard from '@/components/questioncard'

import { useStyles } from './styles'

const Question = (props: LooseObj) => {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <QuestionCard id={1} status={false} content="123" time="2021-1-3" />
      <QuestionCard id={2} status={true} content="123" time="2021-1-3" />
      <QuestionCard id={3} status={false} content="123" time="2021-1-3" />
      <QuestionCard id={4} status={true} content="123" time="2021-1-3" />
    </div>
  )
}

export default Question