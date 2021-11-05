import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import ContactTag from '@components/ContactTag'

import { Tag } from '.prisma/client'

interface ContactTagsProps {
  tags: Tag[]
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    listStyle: 'none',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}))

const ContactTags: React.FC<ContactTagsProps> = ({ tags }) => {
  const classes = useStyles()

  return (
    <Box component="ul" className={classes.root}>
      {tags?.map((tag) => (
        <li key={tag.id}>
          <ContactTag className={classes.chip} tag={tag} />
        </li>
      ))}
    </Box>
  )
}

export default ContactTags
