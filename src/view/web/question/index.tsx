import React from 'react'
import { Paper, CircularProgress } from '@material-ui/core'

import useFetch from '@/hooks/useFetch'
import useBus from '@/hooks/useBus'

import { useStyles } from './styles'
import { usePublicStyles } from '@/publicStyles'

import { compileMarkdown } from '@/utils'


const QuestionPage = (props: LooseObj) => {

  const { id } = props.match.params

  const bus = useBus()

  const classes = useStyles()
  const publicClasses = usePublicStyles()

  const {
    data,
    loading,
  } = useFetch({
    requestURL: `/question/${id}`,
    bus
  })

  return (
    <div>
    {loading.primaryLoading ? 
      <div className={`${publicClasses.loadingIcon} ${publicClasses.loadingIconTop}`}>
        <CircularProgress />
        <p>Loading...</p>
      </div> : 
      <Paper variant="outlined">
        <div dangerouslySetInnerHTML={{ __html: compileMarkdown(data.content) }} />
      </Paper>
    }
    </div>
  )
}

export default QuestionPage