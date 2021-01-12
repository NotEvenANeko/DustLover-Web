import React from 'react'
import { Paper } from '@material-ui/core'
import { CheckOutlined, ErrorOutlineOutlined } from '@material-ui/icons'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'

import { useStyles } from './styles'

interface QuestionCardProps {
  content: string,
  id: number,
  status: boolean,
  time: string,
  [prop: string]: any
}

const QuestionCard = (props: QuestionCardProps) => {

  const { content, status, time, id } = props

  const history = useHistory()

  const handleClick = () => {
    history.push(`/question/${id}`)
  }

  const classes = useStyles()

  return (
    <Paper variant="outlined" className={classes.root} onClick={handleClick}>
      <div dangerouslySetInnerHTML={{ __html: content }} className={classes.content} />
      <div className={classes.statusArea}>
        <p className={classes.timeStatus}>{dayjs(time).format('YYYY.MM.DD')}</p>
        <div className={`${classes.statusIconBanner} ${status ? classes.statusIconTrue : classes.statusIconFalse}`}>
          {status ? <CheckOutlined className={classes.statusIcon} /> : <ErrorOutlineOutlined className={classes.statusIcon} />}
        </div>
      </div>
    </Paper>
  )

}

export default QuestionCard