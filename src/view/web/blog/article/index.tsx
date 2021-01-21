import React from 'react'
import {} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {} from '@material-ui/icons'
import { useSelector } from 'react-redux'

import BackButton from '@/components/backBtn'
import LoadingIcon from '@/components/loadingIcon'

import useFetch from '@/hooks/useFetch'
import useBus from '@/hooks/useBus'

import { CustomState } from '@/redux/types'

const ArticlePage = (props: LooseObj) => {

  const { id } = props.match.params
  const userInfo = useSelector((state: CustomState) => state.user)
  const bus = useBus()

  const { 
    data,
    loading,
    onFetch
  } = useFetch({
    requestURL: `/article/${id}`,
    bus
  })

  return (
    <div>
      <BackButton />

    </div>
  )
}