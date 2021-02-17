import React from 'react'
import { Card, CardContent, TextField, Button } from '@material-ui/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import useFetch from '@/hooks/useFetch'
import useBus from '@/hooks/useBus'

import { compileMarkdown } from '@/utils'
import axios from '@/utils/axios'

import LoadingIcon from '@/components/loadingIcon'
import CustomForm from '@/components/form'

import { CustomState } from '@/redux/types'

import { useStyles } from './styles'

interface FormState {
  content: string
}

interface AboutData {
  content: string
}

const AboutMe = (props: LooseObj) => {

  const classes = useStyles()
  const bus = useBus()

  const userInfo = useSelector((state: CustomState) => state.user)

  const {
    data,
    onFetch,
    loading
  } = useFetch<AboutData>({
    requestURL: '/article/about',
    bus
  })

  const [editMode, setEditMode] = React.useState(false)

  const { register, errors, reset, handleSubmit } = useForm<FormState>()

  const onCancel = () => {
    setEditMode(false)
    reset()
  }

  const handleDoubleClick = () => {
    //if(userInfo.userRole > 1) return
    setEditMode(true)
  }

  const onSubmit: SubmitHandler<FormState> = data => {
    axios.put('/article/about', data)
         .then(() => {
            bus.emit('submitSuccess')
            onFetch()
            setEditMode(false)
         })
         .catch(() => {
           bus.emit('submitFailed')
         })
  }

  React.useEffect(() => {
    if((window as any).MathJax && (window as any).MathJax.typeset)
      (window as any).MathJax.typeset()
  })

  return (
    <>
      <Card variant="outlined" className={classes.cardRoot}>
        <CardContent>
          {loading.primaryLoading ? <LoadingIcon position="top" /> :
          (!editMode ? 
            <div 
              dangerouslySetInnerHTML={{ __html: compileMarkdown(!!data[0] && data[0].content) }} 
              onDoubleClick={handleDoubleClick} 
            /> :
            <CustomForm onCancel={onCancel} onSubmit={handleSubmit(onSubmit)}>
              <TextField  
                error={Boolean(errors.content)}
                id="aboutme-input"
                variant="outlined"
                defaultValue={data[0].content}
                multiline
                fullWidth
                name="content"
                inputRef={register({
                  required: 'Need Content'
                })}
                helperText={errors.content?.message}
              />
            </CustomForm>)
          } 
        </CardContent>
      </Card>
    </>
  )
}

export default AboutMe