import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

const ListItemLink = (props: LooseObj) => {

  const { icon, text, to = null } = props

  const CustomLink = React.useMemo(
    () => 
      React.forwardRef((linkProps, ref: any) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
      [to],
  )

  return !!to?(
    <li>
      <ListItem>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </li>
  ):(
    <ListItem>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
    </ListItem>
  )
}

export default ListItemLink