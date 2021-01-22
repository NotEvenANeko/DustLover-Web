import React from 'react'
import { Divider, List, TextField } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { calcComment } from '@/utils'
import axios from '@/utils/axios'

import { CustomState } from '@/redux/types'

import useBus from '@/hooks/useBus'

import CommentList from './list'
import CustomForm from '@/components/form'

interface DiscussProps {
  commentList: LooseObj[],
  articleId: number,
  setCommentList: Function,
  [prop: string]: any
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    count: {
      marginBottom: theme.spacing(1),
      marginTop: '10vh',
      fontSize: '0.9rem'
    }
  })
)

const Discuss = (props: DiscussProps) => {

  const bus = useBus()
  const classes = useStyles()
  const userInfo = useSelector((state: CustomState) => state.user)
  const history = useHistory()
  const { register, errors, handleSubmit, reset } = useForm<{ content: string }>()

  const onSubmit: SubmitHandler<{ content: string }> = formData => {
    axios.post('/discuss', {
      articleId: props.articleId,
      content: formData.content,
      userId: userInfo.userId
    }).then((res: LooseObj) => {
      reset()
      props.setCommentList(res.rows)
    }).catch(() => {
      bus.emit('submitFailed')
    })
  }

  return (
    <div>
      <div>
        <p className={classes.count}>{calcComment(props.commentList)}条评论</p>
        <Divider variant="middle" />
      </div>

      <List>
        <CustomForm
          onCancel={() => {}}
          noCancel
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            error={Boolean(errors.content)}
            inputRef={register({
              required: 'Need Reply Content'
            })}
            multiline
            fullWidth
            name="content"
            id="comment-content"
            rows={3}
          />
        </CustomForm>

        <CommentList commentList={props.commentList} articleId={props.articleId} setCommentList={props.setCommentList} />
      </List>
    </div>
  )
}

export default Discuss