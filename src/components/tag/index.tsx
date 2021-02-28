import React from 'react'
import { Chip, Divider, TextField } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { LocalOfferOutlined, FolderOutlined } from '@material-ui/icons'
import { useSelector } from 'react-redux'

import { CustomState } from '@/redux/types'

const getColor = (name: string, colorList: LooseObj[]) => {
  const target = colorList.find(c => c.name === name)
  return target ? target.color : ''
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
    icon: {
      marginRight: theme.spacing(0.5),
      fontSize: '1rem'
    }
  })
)

interface ArticleTagProps {
  tagList?: LooseObj[],
  categoryList?: LooseObj[],
  noDivider?: boolean,
  setTagList?: (tags: LooseObj[]) => void,
  setCategoryList?: (categories: LooseObj[]) => void,
  addTag?: boolean
}

interface SubState {
  value: string,
  visible: boolean
}

interface InputState {
  tag: SubState,
  category: SubState
}

const DefaultFunc = (args: LooseObj[]) => {}

const ArticleTags = React.forwardRef((props: ArticleTagProps, ref?: React.Ref<LooseObj>) => {

  const { tagList = [], categoryList = [], setTagList = DefaultFunc, setCategoryList = DefaultFunc, addTag = false, noDivider } = props

  const classes = useStyles()
  const tagColorList = useSelector((state: CustomState) => state.tag.tagList)
  const { userRole } = useSelector((state: CustomState) => state.user)

  const DataSet = {
    tag: {
      list: tagList,
      setter: setTagList
    },
    category: {
      list: categoryList,
      setter: setCategoryList
    }
  }

  React.useImperativeHandle(ref, () => ({
    tags: DataSet.tag.list,
    categories: DataSet.category.list
  }))

  const [inputNew, setInputNew] = React.useState<InputState>({
    tag: {
      value: '',
      visible: false
    },
    category: {
      value: '',
      visible: false
    }
  })

  const showInputNewVisible = (attr: 'tag'|'category') => () => {
    setInputNew({
      ...inputNew,
      [attr]: {
        ...inputNew[attr],
        visible: true
      }
    })
  }

  const handleInputNewChange = (attr: 'tag'|'category') => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputNew({
        ...inputNew,
        [attr]: {
          ...inputNew[attr],
          value: event.target.value
        }
      })
    }

  const handleInputNewConfirm = (attr: 'tag'|'category') => () => {
    if(inputNew[attr].value && !DataSet[attr].list.find(item => item.name === inputNew[attr].value)) {
      DataSet[attr].setter([...DataSet[attr].list, { name: inputNew[attr].value }])
    }
    setInputNew({
      ...inputNew,
      [attr]: {
        value: '',
        visible: false
      }
    })
  }

  const handleEnterPress = (attr: 'tag'|'category') => (event: React.KeyboardEvent<HTMLDivElement>) => {
    if(event.key === 'Enter') handleInputNewConfirm(attr)
  }

  const handleDelete = (removed: string, attr: 'tag'|'category') => {
    DataSet[attr].setter(DataSet[attr].list.filter(item => item.name !== removed))
  }

  const generateObj = (tag: LooseObj, attr: 'tag'|'category', close: boolean) => ({
    onDelete: close ? () => handleDelete(tag.name, attr) : () => {},
    styles: { 
      backgroundColor: attr === 'tag' ? getColor(tag.name, tagColorList) : '#177ddc'
    }
  })

  const generateTSX = (list: LooseObj, attr: 'tag'|'category') => {
    return (
      <>
        {list.map((tag: LooseObj, index: number) => (
          <li key={index}>
            <Chip size="small" {...generateObj(tag, attr, addTag)} />
          </li>
        ))}
      </>
    )
  }

  return (
    <div className={classes.root}>
      {!noDivider && <Divider orientation="vertical" flexItem />}
      <div>
        {(DataSet.tag.list.length > 0 || addTag) && <LocalOfferOutlined className={classes.icon} />}
        {generateTSX(DataSet.tag.list, 'tag')}
        {addTag && (
          inputNew.tag.visible ? (
            <TextField 
              type="text"
              size="small"
              value={inputNew.tag.value}
              onChange={handleInputNewChange('tag')}
              onBlur={handleInputNewConfirm('tag')}
              onKeyPress={handleEnterPress('tag')}
            />
          ) : (
            <Chip clickable onClick={showInputNewVisible('tag')} label="New Tag" />
          )
        )}
      </div>
      {!noDivider && <Divider orientation="vertical" flexItem />}
      <div>
        {(DataSet.tag.list.length > 0 || addTag) && <FolderOutlined className={classes.icon} />}
          {generateTSX(DataSet.category.list, 'category')}
          {addTag && (
            inputNew.category.visible ? (
              <TextField 
                type="text"
                size="small"
                value={inputNew.category.value}
                onChange={handleInputNewChange('category')}
                onBlur={handleInputNewConfirm('category')}
                onKeyPress={handleEnterPress('category')}
              />
            ) : (
              <Chip clickable onClick={showInputNewVisible('category')} label="New Category" />
            )
        )}
      </div>
    </div>
  )
})

export default ArticleTags