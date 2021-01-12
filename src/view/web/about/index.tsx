import React from 'react'
import { Card, CardContent, TextField, Button } from '@material-ui/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import useFetch from '@/hooks/useFetch'
import useBus from '@/hooks/useBus'
import { compileMarkdown } from '@/utils'
import axios from '@/utils/axios'
import { CustomState } from '@/redux/types'
import { useStyles } from './styles'

interface FormState {
  content: string
}

const AboutMe = (props: LooseObj) => {

  const classes = useStyles()
  const bus = useBus()

  const userInfo = useSelector((state: CustomState) => state.user)

  const {
    data,
    onFetch
  } = useFetch({
    requestURL: '/article/about',
    withLoading: true,
    withPagination: false,
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

  if((window as any).MathJax && (window as any).MathJax.typeset)
    (window as any).MathJax.typeset()

  return (
    <>
      <Card variant="outlined" className={classes.cardRoot}>
        <CardContent>
          {!editMode ? 
            <div 
              dangerouslySetInnerHTML={{ __html: compileMarkdown((data as LooseObj).content) }} 
              onDoubleClick={handleDoubleClick} 
            /> :
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.formRoot}>
              <TextField  
                error={Boolean(errors.content)}
                id="aboutme-input"
                variant="outlined"
                defaultValue={(data as LooseObj).content}
                multiline
                fullWidth
                name="content"
                inputRef={register({
                  required: 'Need Content'
                })}
                helperText={errors.content?.message}
              />
              <div className={classes.btnGru}>
                <Button color="default" onClick={onCancel}>取消</Button>
                <Button type="submit" color="primary" variant="contained">提交</Button>
              </div>
            </form>
          } 
        </CardContent>
      </Card>
    </>
  )
}

export default AboutMe