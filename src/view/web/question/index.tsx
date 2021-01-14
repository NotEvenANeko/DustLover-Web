import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { Paper, Divider, TextField } from '@material-ui/core'

import useFetch from '@/hooks/useFetch'
import useBus from '@/hooks/useBus'

import { useStyles } from './styles'

import { CustomState } from '@/redux/types'

import LoadingIcon from '@/components/loadingIcon'
import BackButton from '@/components/backBtn'
import CustomForm from '@/components/form'
import DeleteButton from '@/components/deleteBtn'

import { compileMarkdown } from '@/utils'
import axios from '@/utils/axios'

interface FormState {
  content: string
}

const QuestionPage = (props: LooseObj) => {

  const { id } = props.match.params

  const [editMode, setEditMode] = React.useState(false)

  const userInfo = useSelector((state: CustomState) => state.user)

  const { register, handleSubmit, reset, errors, getValues } = useForm<FormState>()
  const bus = useBus()

  const classes = useStyles()

  const handleDoubleClick = () => {
    setEditMode(true)
  }

  const {
    data,
    loading,
    onFetch,
  } = useFetch({
    requestURL: `/question/${id}`,
    bus
  })  

  const onCancel = () => {
    setEditMode(false)
    reset()
  }

  const handleDelete = () => {
    axios.delete(`/question/${data[0].id}`)
         .then(() => {
           bus.emit('deleteSuccess')
           window.history.back()
         })
         .catch(() => {
           bus.emit('deleteFailed')
         })
  }
  
  const onSubmit: SubmitHandler<FormState> = formData => {
    if(!!data[0] && !!data[0].answer) {
      axios
        .put(`/question/answer/${data[0].answer.id}`, {
          content: formData.content
        })
        .then(() => {
          bus.emit('submitSuccess')
          onFetch()
          setEditMode(false)
        })
        .catch(() => {
          bus.emit('submitFailed')
        })
    } else {
      if(!data[0]) return
      axios.post('/question/answer', {
        content: formData.content,
        questionId: data[0].id
      })
      .then(() => {
        bus.emit('submitSuccess')
        onFetch()
        setEditMode(false)
      })
      .catch(() => {
        bus.emit('submitFailed')
      })
    }
  }

  return (
    <div>
      <BackButton />
      {loading.primaryLoading ? 
        <LoadingIcon position="top" /> : 
        <Paper variant="outlined" className={classes.root}>
          <div dangerouslySetInnerHTML={{ __html: compileMarkdown(!!data[0] && data[0].content) }} className={classes.text} />
          <div className={classes.toolbar}>
            <p>{!!data[0] && dayjs(data[0].createdAt).format('YYYY.MM.DD H:m')}</p>
            <DeleteButton handleDelete={handleDelete} />
          </div>
          <Divider variant="middle" />
          {!editMode ? 
            <div 
              dangerouslySetInnerHTML={{ __html: !!data[0].answer ? compileMarkdown(data[0].answer.content) : '还没有回答'}} 
              className={classes.text} 
              onDoubleClick={handleDoubleClick}
            /> :
            <CustomForm onSubmit={handleSubmit(onSubmit)} onCancel={onCancel}>
              <TextField  
                error={Boolean(errors.content)}
                id="answer-input"
                variant="outlined"
                defaultValue={!!data[0].answer && data[0].answer.content || ''}
                multiline
                fullWidth
                rows={4}
                name="content"
                inputRef={register({
                  required: 'Need Content',
                  validate: value => value !== (!!data[0] && !!data[0].answer && data[0].answer.content) || 'Nothing Changes'
                })}
                helperText={errors.content?.message}
              />
            </CustomForm>
          }
        </Paper>
      }
    </div>
  )
}

export default QuestionPage