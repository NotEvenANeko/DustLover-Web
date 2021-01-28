import React from 'react'
import { Chip, Divider } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

interface SelectedState {
  tags: string[],
  categories: string[]
}

interface BlogSidebarProps {
  tagList: LooseObj[],
  categoryList: LooseObj[],
  selected: SelectedState,
  handleChange: (type: 'tags'|'categories', checked: boolean, item: LooseObj) => void,
  className?: string,
  [prop: string]: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      paddingLeft: theme.spacing(1),
      marginTop: theme.spacing(0.5)
    }
  })
)


const BlogSidebar = (props: BlogSidebarProps) => {

  //const history = useHistory()
  const classes = useStyles()

  return (
    <div className={props.className}>
      <div>
        <Divider variant="middle" />
        <p className={classes.text}>标签</p>
        <div>
          {props.tagList.map((tag, index) => (
            <Chip
              key={index}
              size="small"
              label={tag.name}
              color={props.selectedTags.indexOf(tag.name) > -1 ? 'primary' : 'default'}
              onClick={() => props.handleChange('tags', props.selected.tags.indexOf(tag.name) > -1, tag)}
            />
          ))}
        </div>
      </div>
      <div>
        <Divider variant="middle" />
        <p className={classes.text}>分类</p>
        <div>
          {props.tagList.map((category, index) => (
            <Chip
              key={index}
              size="small"
              label={category.name}
              color={props.selectedCategories.indexOf(category.name) > -1 ? 'primary' : 'default'}
              onClick={() => props.handleChange('categories', props.selected.categories.indexOf(category.name) > -1, category)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar