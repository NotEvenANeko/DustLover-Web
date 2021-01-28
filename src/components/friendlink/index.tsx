import React from 'react'
import { Avatar, Paper } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { LinkOutlined } from '@material-ui/icons'

interface FriendLinkItemProps {
  link: string,
  avatarLink?: string,
  id: number,
  describe?: string,
  title: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
      backgroundColor: '#ffffff',
      transition: 'background-color 0.5s',
      '&:hover': {
        backgroundColor: '#e1e1e1',
        cursor: 'pointer'
      }
    },
    describeArea: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: theme.spacing(2),
    },
    text: {
      margin: 0,
      paddingBottom: theme.spacing(1)
    }
  })
)

const FriendLinkItem = (props: FriendLinkItemProps) => {

  const classes = useStyles()

  const handleClick = () => {
    window.location.href = `https://${props.link}`
  }

  return (
    <Paper variant="outlined" onClick={handleClick} className={classes.root} key={props.id}>
      <Avatar src={props.avatarLink || ''}>
        <LinkOutlined />
      </Avatar>
      <div className={classes.describeArea}>
        <h3 className={classes.text}>{props.title}</h3>
        <p className={classes.text}>{props.describe || ''}</p>
      </div>
    </Paper>
  )
}

export default FriendLinkItem