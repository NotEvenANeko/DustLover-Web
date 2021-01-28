import React from 'react'
import { Chip, Divider } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

interface BlogSidebarProps {
  tagList: LooseObj[],
  categoryList: LooseObj[],
  selectedTags: LooseObj[],
  selectedCategories: LooseObj[],
  handleChange: (type: 'tag'|'category', checked: boolean, item: LooseObj) => void,
  [prop: string]: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
  })
)


const BlogSidebar = (props: BlogSidebarProps) => {

  const history = useHistory()

  return (
    <div>
      <div>
        <Divider variant="middle" />
        <p>标签</p>
        <div>
          {props.tagList.map((tag, index) => (
            <Chip
              key={index}
              size="small"
              label={tag.name}
              color={props.selectedTags.indexOf(tag.name) > -1 ? 'primary' : 'default'}
              onClick={() => props.handleChange('tag', props.selectedTags.indexOf(tag.name) > -1, tag)}
            />
          ))}
        </div>
      </div>
      <div>
        <Divider variant="middle" />
        <p>分类</p>
        <div>
          {props.tagList.map((category, index) => (
            <Chip
              key={index}
              size="small"
              label={category.name}
              color={props.selectedCategories.indexOf(category.name) > -1 ? 'primary' : 'default'}
              onClick={() => props.handleChange('category', props.selectedCategories.indexOf(category.name) > -1, category)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar