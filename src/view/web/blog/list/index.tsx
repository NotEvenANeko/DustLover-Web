import React from 'react'
import { useInView } from 'react-intersection-observer'
import { ExpandMoreOutlined } from '@material-ui/icons'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import useFetch from '@/hooks/useFetch'

import { CustomState } from '@/redux/types'

import LoadingIcon from '@/components/loadingIcon'
import ArticleCard from '@/components/articleCard'

import BlogSidebar from './sidebar'

import { calcComment } from '@/utils'

interface SelectedState {
  tags: string[],
  categories: string[]
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    scrollDownArea: {
      display: 'flex',
      height: '15vh',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    root: {
      display: 'flex'
    },
    sidebar: {
      width: '10vw'
    },
    list: {
      flexGrow: 1
    }
  })
)

const BlogMain = (props: LooseObj) => {

  const [loadToEnd, setLoadToEnd] = React.useState(false)

  const classes = useStyles()

  const {
    data,
    loading,
    handleLoadMore
  } = useFetch({
    requestURL: '/article/list',
    deltaUpd: true,
    loadStep: 10
  })

  const {
    tagList = [],
    categoryList = []
  } = useSelector((state: CustomState) => state.tag)

  const [selected, setSelected] = React.useState<SelectedState>({
    tags: [],
    categories: []
  })

  const [ref, inView] = useInView({
    threshold: 1
  })

  const handleChange = (type: 'tags'|'categories', checked: boolean, item: LooseObj) => {
      setSelected({
        ...selected,
        [type]: checked ? [...selected[type], item.name] : selected[type].filter(tmp => tmp !== item.name)
      })
  }

  React.useEffect(() => {
    if(!inView) return
    if(loading.primaryLoading) return
    const res = handleLoadMore()
    if(!loadToEnd) setLoadToEnd(!res)
  }, [inView])

  return (
    <>
      <div className={classes.root}>
        <div className={classes.list}>
          {loading.primaryLoading ? 
            <LoadingIcon position="top" />
          : data.length > 0 && data.map((item, index: number) => {
            //console.log(item)
            return <ArticleCard 
                    key={index} 
                    id={item.id} 
                    title={item.title} 
                    content={item.content} 
                    time={item.createdAt.split(' ')[0]}
                    commentCnt={calcComment(item.comments)}
                    viewCnt={item.viewCnt}
                  />
          })}
        

          {!loading.primaryLoading && <div ref={ref} className={classes.scrollDownArea}>
            {loadToEnd ? <p>没有更多了呢</p> :
              (!inView ? 
                <LoadingIcon nested={
                  <>
                    <p>下滑展示更多</p>
                    <ExpandMoreOutlined />
                  </>
                } /> :
                <LoadingIcon />)
            }
          </div>}
        </div>
        <BlogSidebar 
          className={classes.sidebar}
          tagList={tagList}
          categoryList={categoryList}
          selected={selected}
          handleChange={handleChange}
        />
      </div>
    </>
  )
}

export default BlogMain