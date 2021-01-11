import React from 'react'
import { Typography } from '@material-ui/core'

import axios from '@/utils/axios'

const AboutMe = (props: LooseObj) => {

  const data = axios.get('/article/0')

  return (
    <>
      <div>{data.toString()}</div>
    </>
  )
}

export default AboutMe