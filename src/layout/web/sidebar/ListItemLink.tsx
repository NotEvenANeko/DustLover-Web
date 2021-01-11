import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

const ListItemLink = (props: LooseObj) => {

  const { icon, text, to = null, className } = props

  const CustomLink = React.useMemo(
    () => 
      React.forwardRef((linkProps, ref: any) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
      [to],
  )

  return !!to?(
    <ListItem button component={CustomLink} className={className}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  ):(
    <ListItem>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
    </ListItem>
  )
}

export default ListItemLink