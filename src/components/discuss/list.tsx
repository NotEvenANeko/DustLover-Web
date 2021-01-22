import React from 'react'
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar, Tooltip, TextField, Divider } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useSelector } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'

import { compileMarkdown } from '@/utils'
import axios from '@/utils/axios'

import { CustomState, UserInfo } from '@/redux/types'

import DeleteButton from '@/components/deleteBtn'
import CustomForm from '@/components/form'

import useBus from '@/hooks/useBus'

interface CommentItemProps {
  userInfo: UserInfo,
  articleId: number,
  commentId: number,
  replyId?: number,
  replyVisible: boolean,
  commentList: LooseObj[],
  setCommentList: Function,
  item: LooseObj,
  key: number,
  onReply: (replyTaeget: ReplyTargetState) => void,
  [prop: string]: any
}

interface CommentListProps {
  commentList: LooseObj[],
  articleId: number,
  setCommentList: Function
}

interface ReplyTargetState {
  commentId: number,
  replyId: number
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: theme.spacing(1),
      '&>li': {
        paddingLeft: '5vw'
      }
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: theme.spacing(2)
    },
    avatar: {
      marginTop: theme.spacing(0.5)
    },
    text: {
      marginTop: theme.spacing(0.5)
    },
    replyBtn: {
      fontSize: '0.8rem',
      marginRight: theme.spacing(1),
      '&:hover': {
        cursor: 'pointer'
      }
    }
  })
)

const CommentItem = (props: CommentItemProps) => {

  dayjs.extend(relativeTime)
  const {
    children,
    item,
    userInfo,
    articleId,
    commentId,
    replyId = 0,
    replyVisible
  } = props
  const { user } = item as LooseObj
  const classes = useStyles()
  const bus = useBus()
  const { register, errors, handleSubmit } = useForm<{content: string}>()

  const onSubmit: SubmitHandler<{content: string}> = formData => {
    axios.post('/discuss', {
      userId: userInfo.userId,
      articleId, commentId,
      content: formData.content.trim()
    })
    .then((res: LooseObj) => {
      props.onReply({ commentId: 0, replyId: 0 })
      props.setCommentList(res.rows)
    })
    .catch(() => {
      bus.emit('submitFailed')
    })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if(event.ctrlKey && event.key === 'Enter') {
      handleSubmit(onSubmit)()
    }
  }

  const handleDelete = () => {
    if(replyId) {
      axios.delete(`/discuss/reply/${replyId}?id=${userInfo.userId}`)
           .then(() => {
             const commentList = [...props.commentList]
             const targetComment = commentList.find(item => item.id === commentId)
             targetComment && (targetComment.replies = targetComment.replies.filter((item: LooseObj) => item.id !== replyId))
             props.setCommentList(commentList)
           })
           .catch(() => {
             bus.emit('deleteFailed')
           })
    } else {
      axios.delete(`/discuss/comment/${commentId}?id=${userInfo.userId}`)
           .then(() => {
             const commentList = [...props.commentList].filter(item => item.id !== commentId)
             props.setCommentList(commentList)
           })
           .catch(() => {
             bus.emit('deleteFailed')
           })
    }
  }

  const handleReply = () => {
    props.onReply({ commentId, replyId })
  }

  return (
    <ListItem key={props.key} className={classes.root}>
      <div className={classes.container}>
        <ListItemAvatar className={classes.avatar}>
          <Avatar />
        </ListItemAvatar>
        <div>
          <ListItemText
            className={classes.text}
            primary={
              <div>
                <span>{user && user.username}</span>
                <Tooltip title={dayjs(item.createdAt).format('YYYY.MM.DD H:m')} placement="top">
                  <span style={{ fontSize: '0.8rem' }}>{dayjs(item.createdAt).fromNow()}</span>
                </Tooltip>
              </div>
            }
            secondary={
              <div dangerouslySetInnerHTML={{ __html: compileMarkdown(item.content) }} />
            }
          />
          <span onClick={handleReply} className={classes.replyBtn}>Reply to</span>
          <DeleteButton handleDelete={handleDelete} size="small" fontSize="small" />
          {
            replyVisible && (
              <div>
                <CustomForm
                  onCancel={() => {}}
                  noCancel
                  size="small"
                  onSubmit={handleSubmit(onSubmit)}
                  submitText="回复"
                >
                  <TextField
                    error={Boolean(errors.content)}
                    multiline
                    fullWidth
                    variant="outlined"
                    rows={2}
                    name="content"
                    id="reply-content"
                    onKeyPress={handleKeyPress}
                    inputRef={register({
                      required: 'Need Reply Content'
                    })}
                  />
                </CustomForm>
              </div>
            )
          }
        </div>
      </div>
      {children}
    </ListItem>
  )

}



const CommentList = (props: CommentListProps) => {
  const userInfo = useSelector((state: CustomState) => state.user)
  const [replyTarget, setReplyTarget] = React.useState<ReplyTargetState>({
    commentId: 0,
    replyId: 0
  })

  const handleReply = (replyTarget: ReplyTargetState) => {
    setReplyTarget(replyTarget)
  }

  const { commentList, articleId } = props

  return (
    <div>
      {commentList.map(item => (
        <>
          <CommentItem
            item={item}
            key={item.id}
            articleId={articleId}
            userInfo={userInfo}
            commentId={item.id}
            setCommentList={props.setCommentList}
            commentList={props.commentList}
            onReply={handleReply}
            replyVisible={replyTarget.commentId === item.id && !replyTarget.replyId}
          >
            {item.replies.map((reply: LooseObj) => (
              <CommentItem 
                item={reply}
                key={reply.id}
                articleId={articleId}
                userInfo={userInfo}
                commentId={item.id}
                replyId={reply.id}
                setCommentList={props.setCommentList}
                commentList={props.commentList}
                onReply={handleReply}
                replyVisible={replyTarget.commentId === item.id && replyTarget.replyId === reply.id}
              />
            ))}
          </CommentItem>
          <Divider variant="middle" />
        </>
      ))}
    </div>
  )
}

export default CommentList