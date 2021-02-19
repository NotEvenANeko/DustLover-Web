import React from 'react'
import { TextField, Toolbar, Typography, Paper } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import CustomForm from '@/components/form'
import LoadingIcon from '@/components/loadingIcon'
import BackButton from '@/components/backBtn'

import axios from '@/utils/axios'

import useBus from '@/hooks/useBus'
import useFetch from '@/hooks/useFetch'

interface FriendLinkData {
  id?: number
  title?: string
  link?: string
  avatarLink?: string | null
  describe?: string | null
  createdAt?: string
  updatedAt?: string
}

type FormData = FriendLinkData

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    form: {
      margin: theme.spacing(1),
      '&>&': {
        marginTop: theme.spacing(1)
      }
    }
  }))

const AdminFriendLinkEdit = (props: LooseObj) => {
  const { id } = props.match.params
  const bus = useBus()
  const history = useHistory()
  const classes = useStyles()
  const { handleSubmit, register, errors } = useForm<FormData>()

  const {
    data,
    onFetch,
    loading
  } = useFetch<FriendLinkData>({
    requestURL: `/friend/${id}`,
    bus
  })
  
  const onCancel = () => {}

  const onSubmit: SubmitHandler<FormData> = data => {
    axios.put(`/friend`, {
      ...data,
      linkId: id
    })
         .then(() => {
           bus.emit('submitSuccess')
           history.goBack()
         })
         .catch(() => {
           bus.emit('submitFailed')
         })
  }
 
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar>
          <BackButton noLabel />
          <Typography variant="h6" id="friend-edit-title" component="div">
            Friend Link Edit
          </Typography>
        </Toolbar>
        {loading.primaryLoading ? <LoadingIcon /> : (
        <CustomForm onCancel={onCancel} noCancel onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TextField
            id="friend-title"
            label="Friend Link Title"
            defaultValue={data[0].title}
            fullWidth
            inputRef={register({
              required: 'Title is required'
            })}
            name="title"
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />
          <TextField
            id="friend-link"
            label="Friend Link"
            defaultValue={data[0].link}
            fullWidth
            inputRef={register({
              required: 'Link is required'
            })}
            name="link"
            error={Boolean(errors.link)}
            helperText={errors.link?.message}
          />
          <TextField
            id="friend-avatarLink"
            label="Friend Avatar Link"
            defaultValue={data[0].avatarLink}
            fullWidth
            inputRef={register({})}
            name="avatarLink"
            error={Boolean(errors.avatarLink)}
            helperText={errors.avatarLink?.message}
          />
          <TextField
            id="friend-describe"
            label="Friend Describe"
            defaultValue={data[0].describe}
            fullWidth
            inputRef={register({})}
            name="describe"
            error={Boolean(errors.describe)}
            helperText={errors.describe?.message}
          />
        </CustomForm>)}
      </Paper>
    </div>
  )
}

export default AdminFriendLinkEdit