import React from 'react'
import { AddOutlined } from '@material-ui/icons'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Drawer, Fab, TextField } from '@material-ui/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'

import CustomForm from '@/components/form'

import { CustomState } from '@/redux/types'

import axios from '@/utils/axios'

import useBus from '@/hooks/useBus'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    }
  })
)

interface FormState {
  content: string
}

interface AddQuestionProps {
  onFetch: Function,
  [prop: string]: any
}

const AddQuestion = (props: AddQuestionProps) => {
  const classes = useStyles()
  const bus = useBus()
  const userInfo = useSelector((state: CustomState) => state.user)
  const { register, handleSubmit, reset, errors } = useForm<FormState>()

  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onCancel = () => {
    setOpen(false)
    reset()
  }

  const onSubmit: SubmitHandler<FormState> = formData => {
    axios.post('/question', {
      content: formData.content
    })
      .then(() => {
        props.onFetch()
        setOpen(false)
        bus.emit('submitSuccess')
      })
      .catch(() => {
        bus.emit('submitFailed')
      })
  }

  return (
    <div {...props}>
      <Fab color="primary" onClick={handleClick}>
        <AddOutlined />
      </Fab>
      <Drawer anchor="bottom" open={open} onClose={handleClose}>
        <div className={classes.root}>
          <CustomForm
            onCancel={onCancel}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField 
              id="question-input"
              variant="outlined"
              multiline
              fullWidth
              rows={4}
              name="content"
              inputRef={register({
                required: 'Need Content'
              })}
            />
          </CustomForm>
        </div>
      </Drawer>
    </div>
  )
}

export default AddQuestion