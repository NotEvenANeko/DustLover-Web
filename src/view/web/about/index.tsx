import React from 'react'
import { Typography } from '@material-ui/core'

import useFetch from '@/hooks/useFetch'
import useBus from '@/hooks/useBus'
import axios from '@/utils/axios'

const AboutMe = (props: LooseObj) => {

  const bus = useBus()

  const {
    data
  } = useFetch({
    requestURL: '/article/1',
    withLoading: true,
    withPagination: false,
    bus
  })

  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  )
}

export default AboutMe