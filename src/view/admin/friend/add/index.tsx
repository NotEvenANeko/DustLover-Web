import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Paper, TextField, Toolbar, Typography } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import CustomForm from '@/components/form'

import axios from '@/utils/axios'

import useBus from '@/hooks/useBus'

interface FormData {
  title: string
  link?: string
  avatarLink?: string
  describe?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      margin: theme.spacing(1)
    }
  }))

const AdminFriendLinkAdd = (props: LooseObj) => {
  const history = useHistory()
  const bus = useBus()
  const classes = useStyles()
  const { register, handleSubmit, errors, reset } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = data => {
    axios.post('/friend', data)
         .then(() => {
           bus.emit('submitSuccess')
           history.push(`/admin/friend`)
         })
         .catch(() => {
           bus.emit('submitFailed')
         })
  }

  const onCancel = () => {
    reset()
    history.push('/admin/friend')
  }

  return (
    <div>
      <Paper>
        <Toolbar>
          <Typography variant="h6" component="div" id="friend-link-add">
            Add Friend Link
          </Typography>
        </Toolbar>
        <CustomForm
          className={classes.table}
          onCancel={onCancel}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="friend-title"
            name="title"
            label="Friend Link Title"
            fullWidth
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            inputRef={register({
              required: 'Title Required'
            })}
          />
          <TextField
            id="friend-link"
            name="link"
            label="Friend Link"
            fullWidth
            error={Boolean(errors.link)}
            helperText={errors.link?.message}
            inputRef={register({})}
          />
          <TextField
            id="friend-avatarLink"
            name="avatarLink"
            label="Friend Avatar Link"
            fullWidth
            error={Boolean(errors.avatarLink)}
            helperText={errors.avatarLink?.message}
            inputRef={register({})}
          />
          <TextField
            id="friend-describe"
            name="describe"
            label="Friend Link Describe"
            fullWidth
            error={Boolean(errors.describe)}
            helperText={errors.describe?.message}
            inputRef={register({})}
          />
        </CustomForm>
      </Paper>
    </div>
  )
}

export default AdminFriendLinkAdd