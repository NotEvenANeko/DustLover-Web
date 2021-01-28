import React from 'react'

import FriendLinkItem from '@/components/friendlink'
import LoadingIcon from '@/components/loadingIcon'

import useFetch from '@/hooks/useFetch'

const FriendLink = (props: LooseObj) => {

  const {
    data,
    loading
  } = useFetch({
    requestURL: '/friend'
  })

  console.log(data)

  return (
    <>
      {loading.primaryLoading ? <LoadingIcon /> : (
        <>
          {data.length > 0 ? data.map(item => 
            <FriendLinkItem 
              id={item.id}
              title={item.title}
              describe={item.describe}
              avatarLink={item.avatarLink}
              link={item.link}
            />
          ) : <p>没有东西呢……</p>}
        </>
      )}
    </>
  )
}

export default FriendLink